#!/bin/bash
docker container prune
docker volume rm evento-db-mysql-local
docker volume rm evento-db-mongo-local
docker volume rm evento-rabbitmq

docker network create evento-dev
docker volume create evento-db-mysql-local
docker volume create evento-db-mongo-local
docker volume create evento-rabbitmq
