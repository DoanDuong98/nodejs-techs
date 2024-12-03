#!/bin/bash
echo "Hello, guys!"

trap "error_handler" ERR

error_handler() {
  local exit_code=$?
  echo "Error copy DockerFile! Exit code: $exit_code"
  exit $exit_code
}

selected_dir=${1:-"nodejs"}
destination_dir="../express-base"
directory=$(dirname "$0")

echo "You selected dir:: $selected_dir"

function copyDockerFile() {
    cp "$directory/$selected_dir/Dockerfile" "$destination_dir/Dockerfile" && cp "$directory/$selected_dir/docker-compose.yml" "$destination_dir/docker-compose.yml" && cp "$directory/$selected_dir/.dockerignore" "$destination_dir/.dockerignore"
    echo "Copy Dockerfile from $selected_dir successfully"
}

copyDockerFile
