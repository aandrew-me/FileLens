package main

import (
	"context"
	"fmt"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
	"gopkg.in/vansante/go-ffprobe.v2"
)

// App struct
type App struct {
	ctx context.Context
	startupFile string
}

// NewApp creates a new App application struct
func NewApp(startFile string) *App {
	return &App{
		startupFile: startFile,
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// SelectFile opens a native file dialog and returns the selected path
func (a *App) SelectFile() (string, error) {
	selection, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select Video File",
		Filters: []runtime.FileFilter{
			{DisplayName: "Videos", Pattern: "*.mp4;*.mkv;*.avi;*.mov;*.webm;*.mp3;*.flac;*.wav"},
			{DisplayName: "All Files", Pattern: "*.*"},
		},
	})
	if err != nil {
		return "", err
	}
	return selection, nil
}

// GetVideoMetadata analyzes the file and returns the probe data
func (a *App) GetVideoMetadata(filePath string) (*ffprobe.ProbeData, error) {
	if filePath == "" {
		return nil, fmt.Errorf("no file selected")
	}

	// Set a timeout for the probe operation
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	data, err := ffprobe.ProbeURL(ctx, filePath)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (a *App) GetStartupFile() string {
	return a.startupFile
}