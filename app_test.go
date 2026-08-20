package main

import (
	"path/filepath"
	"testing"
)

func TestAppStartupFile(t *testing.T) {
	testPath := "video.mp4"
	absPath, err := filepath.Abs(testPath)
	if err != nil {
		t.Fatalf("unexpected error resolving abs path: %v", err)
	}

	app := NewApp(absPath)
	if app.GetStartupFile() != absPath {
		t.Fatalf("expected startup file %q, got %q", absPath, app.GetStartupFile())
	}
}
