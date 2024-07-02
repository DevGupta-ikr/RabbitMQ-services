#!/bin/bash

docker_image_name=$(cat package.json | grep name | sed -n 's/.*"\(.*\)".*/\1/p')
docker_image_version=$(cat package.json | grep version | sed -n 's/.*"\(.*\)".*/\1/p')
docker_image="$docker_image_name:$docker_image_version"

docker build --build-arg IMAGE_VERSION="$docker_image_version" --file "./docker/Dockerfile" --tag "$docker_image" .
