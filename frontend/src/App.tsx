import {useState, useEffect} from "react";
import "./App.css";
import {
	SelectFile,
	GetVideoMetadata,
	GetStartupFile,
} from "../wailsjs/go/main/App";
import {ffprobe} from "../wailsjs/go/models";
import {WindowControls} from "./WindowControls";
import {OnFileDrop} from "../wailsjs/runtime/runtime";

const VideoIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
		<line x1="7" y1="2" x2="7" y2="22"></line>
		<line x1="17" y1="2" x2="17" y2="22"></line>
		<line x1="2" y1="12" x2="22" y2="12"></line>
		<line x1="2" y1="7" x2="7" y2="7"></line>
		<line x1="2" y1="17" x2="7" y2="17"></line>
		<line x1="17" y1="17" x2="22" y2="17"></line>
		<line x1="17" y1="7" x2="22" y2="7"></line>
	</svg>
);
const AudioIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M9 18V5l12-2v13"></path>
		<circle cx="6" cy="18" r="3"></circle>
		<circle cx="18" cy="16" r="3"></circle>
	</svg>
);
const SubtitleIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
	</svg>
);
const UploadIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
		<polyline points="17 8 12 3 7 8"></polyline>
		<line x1="12" y1="3" x2="12" y2="15"></line>
	</svg>
);
const TagIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
		<line x1="7" y1="7" x2="7.01" y2="7"></line>
	</svg>
);

const DropIcon = () => (
	<svg
		width="64"
		height="64"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
		<polyline points="17 8 12 3 7 8" />
		<line x1="12" y1="3" x2="12" y2="15" />
	</svg>
);

function App() {
	const [filePath, setFilePath] = useState<string>("");
	const [metaData, setMetaData] = useState<ffprobe.ProbeData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>("");
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		OnFileDrop((x, y, paths) => {
			console.log("Dropped at coordinates:", x, y);

			setIsDragging(false);

			if (paths && paths.length > 0) {
				const path = paths[0];
				setFilePath(path);
				analyze(path);
			}
		}, false);

		const init = async () => {
			const startPath = await GetStartupFile();
			if (startPath && startPath !== "") {
				setFilePath(startPath);
				analyze(startPath);
			}
		};
		init();
	}, []);

	const onDragEnter = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const onDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		// Only disable if we are leaving the window, not entering a child
		if (e.currentTarget.contains(e.relatedTarget as Node)) return;
		setIsDragging(false);
	};

	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault(); // Necessary to allow dropping
		e.stopPropagation();
	};

	// Handle Context Menu Startup
	useEffect(() => {
		const init = async () => {
			const startPath = await GetStartupFile();
			if (startPath && startPath !== "") {
				setFilePath(startPath);
				analyze(startPath);
			}
		};
		init();
	}, []);

	const handleSelectFile = async () => {
		setError("");
		try {
			const path = await SelectFile();
			if (path) {
				setFilePath(path);
				analyze(path);
			}
		} catch (err: any) {
			setError(err.toString());
		}
	};

	const analyze = async (path: string) => {
		setLoading(true);
		setMetaData(null);
		try {
			const data = await GetVideoMetadata(path);
			setMetaData(data);
		} catch (err: any) {
			setError("Could not probe file. " + err);
		} finally {
			setLoading(false);
		}
	};

	// Helper: Formats bytes
	const formatBytes = (bytes?: string | number) => {
		if (!bytes) return "—";
		const b = Number(bytes);
		if (b === 0) return "0 B";
		const k = 1024;
		const sizes = ["B", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(b) / Math.log(k));
		return parseFloat((b / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	// Helper: Formats Duration
	const formatDuration = (seconds?: number) => {
		if (!seconds) return "—";
		const h = Math.floor(seconds / 3600);
		const m = Math.floor((seconds % 3600) / 60);
		const s = Math.floor(seconds % 60);
		return `${h > 0 ? h + "h " : ""}${m}m ${s}s`;
	};

	// Helper: Smart Tag Lookup (Case insensitive)
	const getTag = (key: string): string | null => {
		if (!metaData?.format?.tags) return null;
		const tags = metaData.format.tags as Record<string, any>;
		// Find key matching "title" or "Title" or "TITLE"
		const foundKey = Object.keys(tags).find(
			(k) => k.toLowerCase() === key.toLowerCase()
		);
		return foundKey ? tags[foundKey] : null;
	};

	const hasMetadata = !!(
		getTag("title") ||
		getTag("artist") ||
		getTag("date") ||
		getTag("comment") ||
		getTag("description")
	);

	return (
		<div
			id="app"
			onDragEnter={onDragEnter}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
		>
			{/* NEW: Drop Zone Overlay */}
			{isDragging && (
				<div className="drop-overlay">
					<div className="drop-content">
						<div className="drop-icon-pulse">
							<DropIcon />
						</div>
						<h3>Release to Analyze</h3>
					</div>
				</div>
			)}

			<WindowControls />

			<div className="content-wrapper">
				<div className="hero-section">
					{/* <h1>Media Inspector</h1> */}
					<button
						className="btn-glass"
						onClick={handleSelectFile}
						disabled={loading}
					>
						<UploadIcon />
						{loading ? "Analyzing..." : "Open Source File"}
					</button>

					{error && (
						<div
							className="error-msg"
							style={{marginTop: 20, color: "#ff453a"}}
						>
							{error}
						</div>
					)}

					{filePath && (
						<div style={{textAlign: "center"}}>
							<div className="file-badge">
								{filePath.split(/[\\/]/).pop()}
							</div>
						</div>
					)}
				</div>

				{metaData && (
					<div className="dashboard-grid">
						{/* 1. Container Stats */}
						<div className="glass-panel">
							<div className="panel-header">
								<h2>Container Overview</h2>
								<div style={{opacity: 0.5, fontSize: "0.9rem"}}>
									{metaData.format?.format_long_name}
								</div>
							</div>
							<div className="stats-row">
								<div className="stat-box">
									<span className="stat-label">Duration</span>
									<span className="stat-value">
										{formatDuration(
											metaData.format?.duration
										)}
									</span>
								</div>
								<div className="stat-box">
									<span className="stat-label">Size</span>
									<span className="stat-value">
										{formatBytes(metaData.format?.size)}
									</span>
								</div>
								<div className="stat-box">
									<span className="stat-label">Bitrate</span>
									<span className="stat-value">
										{metaData.format?.bit_rate
											? formatBytes(
													metaData.format?.bit_rate
											  ) + "/s"
											: "—"}
									</span>
								</div>
							</div>
						</div>

						{/* 2. Metadata Card (Only shows if tags exist) */}
						{hasMetadata && (
							<div className="glass-panel">
								<div className="panel-header">
									<div
										style={{
											display: "flex",
											alignItems: "center",
											gap: 10,
										}}
									>
										<TagIcon />
										<h2>Metadata</h2>
									</div>
								</div>

								<div className="meta-content">
									{getTag("title") && (
										<div className="meta-hero">
											<label>Title</label>
											<div className="hero-text">
												{getTag("title")}
											</div>
										</div>
									)}

									<div className="meta-grid">
										{getTag("artist") && (
											<div className="meta-item">
												<label>Artist / Composer</label>
												<span>{getTag("artist")}</span>
											</div>
										)}
										{getTag("album") && (
											<div className="meta-item">
												<label>Album</label>
												<span>{getTag("album")}</span>
											</div>
										)}
										{getTag("date") && (
											<div className="meta-item">
												<label>Date / Year</label>
												<span>
													{getTag("date") ||
														getTag("creation_time")}
												</span>
											</div>
										)}
										{getTag("encoder") && (
											<div className="meta-item">
												<label>Encoder</label>
												<span>{getTag("encoder")}</span>
											</div>
										)}
									</div>

									{(getTag("description") ||
										getTag("comment")) && (
										<div className="meta-long-text">
											<label>Description</label>
											<p>
												{getTag("description") ||
													getTag("comment")}
											</p>
										</div>
									)}
								</div>
							</div>
						)}

						{/* 3. Streams List */}
						<div className="glass-panel">
							<div className="panel-header">
								<h2>Internal Streams</h2>
							</div>
							<div className="streams-list">
								{metaData.streams?.map((stream, idx) => (
									<div
										key={idx}
										className={`stream-item ${stream.codec_type}`}
									>
										<div className="stream-icon">
											{stream.codec_type === "video" && (
												<VideoIcon />
											)}
											{stream.codec_type === "audio" && (
												<AudioIcon />
											)}
											{stream.codec_type ===
												"subtitle" && <SubtitleIcon />}
										</div>
										<div className="stream-info">
											<div className="stream-title">
												{stream.codec_long_name ||
													stream.codec_name?.toUpperCase()}
											</div>
											<div className="stream-meta">
												<span>#{stream.index}</span>

												{stream.codec_type ===
													"video" && (
													<>
														<span className="meta-tag">
															{stream.width}×
															{stream.height}
														</span>
														<span className="meta-tag">
															{
																stream.r_frame_rate.split(
																	"/"
																)[0]
															}{" "}
															FPS
														</span>
													</>
												)}

												{stream.codec_type ===
													"audio" && (
													<>
														<span className="meta-tag">
															{stream.sample_rate}{" "}
															Hz
														</span>
														<span className="meta-tag">
															{stream.channels} Ch
														</span>
													</>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
