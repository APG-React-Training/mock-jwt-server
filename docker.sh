#!/usr/bin/env bash

CONTAINER_NAME="nodejs-mongo"

if [[ $(docker ps -a --filter="name=$CONTAINER_NAME" --filter "status=exited" | grep -w "$CONTAINER_NAME") ]]; then
    echo "docker start ..."
elif [[ $(docker ps -a --filter="name=$CONTAINER_NAME" --filter "status=running" | grep -w "$CONTAINER_NAME") ]]; then
    echo "Docker container still running."
else
   docker run --rm -d -p 27017:27017 --name $CONTAINER_NAME -v data-vol:/data/db mongo:latest
fi