#!/usr/bin/env bash

# Start shared docker compose services
../pam-docker-compose-shared/start-docker-compose.sh mock-oauth2-server redis

docker compose up
