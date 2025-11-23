import { WindowMinimise, WindowToggleMaximise, Quit } from "../wailsjs/runtime/runtime";

export function WindowControls() {
    return (
        <div className="window-controls">
            <button className="control-btn min" onClick={WindowMinimise} title="Minimize">
                <svg width="10" height="1" viewBox="0 0 10 1"><line x1="0" y1="0.5" x2="10" y2="0.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <button className="control-btn max" onClick={WindowToggleMaximise} title="Maximize">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="1" y="1" width="8" height="8" rx="2" /></svg>
            </button>
            <button className="control-btn close" onClick={Quit} title="Close">
                <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
        </div>
    );
}