package main

import (
	"io"
	"os"
	"strings"
	"sync"
	"testing"
)

func Test_printSomething(t *testing.T) {
	stdOut := os.Stdout

	r, w, _ := os.Pipe()
	os.Stdout = w

	var wg sync.WaitGroup
	wg.Add(1)

	go printSomething("epsilon", &wg)

	// Waiting for the wg to resolve
	wg.Wait()

	// Close the pipe
	_ = w.Close()

	result, _ := io.ReadAll(r)
	output := string(result)

	// We need to reset the things as they where before.
	os.Stdout = stdOut

	// Perform the test.
	if !strings.Contains(output, "epsilon") {
		t.Errorf("Expected to find epsilon, but it is not there.")
	}
}
