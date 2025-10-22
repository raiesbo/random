#!/bin/bash

# - Receives the name of a file as an argument
# - Calculates the checksum of this file every five seconds
# - If the result is different from the previous one,
# the content of the file was changes and triggers the execution of the mdp tool.


FHASH=`md5sum $1`
while true; do
  NHASH=`md5sum $1`
  if [ "$NHASH" != "$FHASH" ]; then
    ./mdp -file $1
    FHASH=$NHASH
  fi
  sleep 5
done
