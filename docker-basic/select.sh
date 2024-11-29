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

echo "You selected dir:: $selected_dir"

function copyDockerFile() {
    cp "./$selected_dir/Dockerfile" "$destination_dir/Dockerfile" && cp "./$selected_dir/docker-compose.yml" "$destination_dir/docker-compose.yml"
    echo "Copy Dockerfile from $selected_dir successfully"
}

copyDockerFile
