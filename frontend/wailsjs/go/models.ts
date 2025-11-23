export namespace ffprobe {
	
	export class Chapter {
	    id: number;
	    time_base: string;
	    start_time: number;
	    end_time: number;
	    tags: Record<string, any>;
	
	    static createFrom(source: any = {}) {
	        return new Chapter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.time_base = source["time_base"];
	        this.start_time = source["start_time"];
	        this.end_time = source["end_time"];
	        this.tags = source["tags"];
	    }
	}
	export class Format {
	    filename: string;
	    nb_streams: number;
	    nb_programs: number;
	    format_name: string;
	    format_long_name: string;
	    start_time: number;
	    duration: number;
	    size: string;
	    bit_rate: string;
	    probe_score: number;
	    tags: Record<string, any>;
	
	    static createFrom(source: any = {}) {
	        return new Format(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.filename = source["filename"];
	        this.nb_streams = source["nb_streams"];
	        this.nb_programs = source["nb_programs"];
	        this.format_name = source["format_name"];
	        this.format_long_name = source["format_long_name"];
	        this.start_time = source["start_time"];
	        this.duration = source["duration"];
	        this.size = source["size"];
	        this.bit_rate = source["bit_rate"];
	        this.probe_score = source["probe_score"];
	        this.tags = source["tags"];
	    }
	}
	export class FormatTags {
	    major_brand: string;
	    minor_version: string;
	    compatible_brands: string;
	    creation_time: string;
	
	    static createFrom(source: any = {}) {
	        return new FormatTags(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.major_brand = source["major_brand"];
	        this.minor_version = source["minor_version"];
	        this.compatible_brands = source["compatible_brands"];
	        this.creation_time = source["creation_time"];
	    }
	}
	export class SideData {
	    side_data_type: string;
	
	    static createFrom(source: any = {}) {
	        return new SideData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.side_data_type = source["side_data_type"];
	    }
	}
	export class StreamDisposition {
	    default: number;
	    dub: number;
	    original: number;
	    comment: number;
	    lyrics: number;
	    karaoke: number;
	    forced: number;
	    hearing_impaired: number;
	    visual_impaired: number;
	    clean_effects: number;
	    attached_pic: number;
	
	    static createFrom(source: any = {}) {
	        return new StreamDisposition(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.default = source["default"];
	        this.dub = source["dub"];
	        this.original = source["original"];
	        this.comment = source["comment"];
	        this.lyrics = source["lyrics"];
	        this.karaoke = source["karaoke"];
	        this.forced = source["forced"];
	        this.hearing_impaired = source["hearing_impaired"];
	        this.visual_impaired = source["visual_impaired"];
	        this.clean_effects = source["clean_effects"];
	        this.attached_pic = source["attached_pic"];
	    }
	}
	export class Stream {
	    index: number;
	    id: string;
	    codec_name: string;
	    codec_long_name: string;
	    codec_type: string;
	    codec_time_base: string;
	    codec_tag_string: string;
	    codec_tag: string;
	    r_frame_rate: string;
	    avg_frame_rate: string;
	    time_base: string;
	    start_pts: number;
	    start_time: string;
	    duration_ts: number;
	    duration: string;
	    bit_rate: string;
	    bits_per_raw_sample: string;
	    nb_frames: string;
	    disposition?: StreamDisposition;
	    tags: Record<string, any>;
	    field_order?: string;
	    profile?: string;
	    width: number;
	    height: number;
	    has_b_frames?: number;
	    sample_aspect_ratio?: string;
	    display_aspect_ratio?: string;
	    pix_fmt?: string;
	    level?: number;
	    color_range?: string;
	    color_space?: string;
	    color_transfer?: string;
	    color_primaries?: string;
	    sample_fmt?: string;
	    sample_rate?: string;
	    channels?: number;
	    channel_layout?: string;
	    bits_per_sample?: number;
	    side_data_list?: SideData[];
	
	    static createFrom(source: any = {}) {
	        return new Stream(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.index = source["index"];
	        this.id = source["id"];
	        this.codec_name = source["codec_name"];
	        this.codec_long_name = source["codec_long_name"];
	        this.codec_type = source["codec_type"];
	        this.codec_time_base = source["codec_time_base"];
	        this.codec_tag_string = source["codec_tag_string"];
	        this.codec_tag = source["codec_tag"];
	        this.r_frame_rate = source["r_frame_rate"];
	        this.avg_frame_rate = source["avg_frame_rate"];
	        this.time_base = source["time_base"];
	        this.start_pts = source["start_pts"];
	        this.start_time = source["start_time"];
	        this.duration_ts = source["duration_ts"];
	        this.duration = source["duration"];
	        this.bit_rate = source["bit_rate"];
	        this.bits_per_raw_sample = source["bits_per_raw_sample"];
	        this.nb_frames = source["nb_frames"];
	        this.disposition = this.convertValues(source["disposition"], StreamDisposition);
	        this.tags = source["tags"];
	        this.field_order = source["field_order"];
	        this.profile = source["profile"];
	        this.width = source["width"];
	        this.height = source["height"];
	        this.has_b_frames = source["has_b_frames"];
	        this.sample_aspect_ratio = source["sample_aspect_ratio"];
	        this.display_aspect_ratio = source["display_aspect_ratio"];
	        this.pix_fmt = source["pix_fmt"];
	        this.level = source["level"];
	        this.color_range = source["color_range"];
	        this.color_space = source["color_space"];
	        this.color_transfer = source["color_transfer"];
	        this.color_primaries = source["color_primaries"];
	        this.sample_fmt = source["sample_fmt"];
	        this.sample_rate = source["sample_rate"];
	        this.channels = source["channels"];
	        this.channel_layout = source["channel_layout"];
	        this.bits_per_sample = source["bits_per_sample"];
	        this.side_data_list = this.convertValues(source["side_data_list"], SideData);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ProbeData {
	    streams: Stream[];
	    format?: Format;
	    chapters: Chapter[];
	
	    static createFrom(source: any = {}) {
	        return new ProbeData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.streams = this.convertValues(source["streams"], Stream);
	        this.format = this.convertValues(source["format"], Format);
	        this.chapters = this.convertValues(source["chapters"], Chapter);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	
	export class StreamTags {
	    rotate?: number;
	    creation_time?: string;
	    language?: string;
	    title?: string;
	    encoder?: string;
	    location?: string;
	
	    static createFrom(source: any = {}) {
	        return new StreamTags(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.rotate = source["rotate"];
	        this.creation_time = source["creation_time"];
	        this.language = source["language"];
	        this.title = source["title"];
	        this.encoder = source["encoder"];
	        this.location = source["location"];
	    }
	}

}

