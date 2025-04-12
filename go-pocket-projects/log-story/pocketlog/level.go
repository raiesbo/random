package pocketlog

type Level byte

const (
	// LevelDebug represents the lowest level of log, most used for debugging purposes.
	LevelDebug Level = iota

	// LevelInfo represents a loggin level that contains information deemed valuable.
	LevelInfo

	// LevelError represents the highest loggin level, only to be used to tracke errors.
	LevelError
)
