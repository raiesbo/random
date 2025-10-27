package main

import "errors"

var (
	ErrNotNumber         = errors.New("data is not number")
	ErrInvalidColumn     = errors.New("invalid column number")
	ErrNoFiles           = errors.New("no input files")
	ErrInvalidOperations = errors.New("invalid operation")
)
