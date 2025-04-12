/*
Package pocketlog exposes an API to log your work.

First, instantiate a logger with poketlog.New, and giving it a threshold level.
Message of lesse critically won't be logger.

Sharing the logger is the responsability of the caller.

The logger can be called to log messages on three levels:
	- Debug: mostly used to debug code, follow step-by-step processes
	- Info: valuable messages providing insights to milestones of a process
	- Error: error messages to understand waht went wrong
*/

package pocketlog
