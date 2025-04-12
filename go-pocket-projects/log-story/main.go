package main

import (
	"log-story/pocketlog"
	"os"
	"time"
)

// Usage example of the pocketlog library.
func main() {
	lgr := pocketlog.New(pocketlog.LevelInfo, pocketlog.WithOutput(os.Stdout))

	lgr.Infof("A little copying is better than a little dependency.")
	lgr.Errorof("Errors are values. Documentation is for %s.", "users")
	lgr.Debugf("Make the zero (%d) vale useful.", 0)
	lgr.Infof("Hello, %d %v", 2025, time.Now())
}
