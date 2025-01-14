#!/usr/bin/env bash

# Start shared docker compose services
../pam-docker-compose-shared/start-docker-compose.sh postgres mock-oauth2-server redis

# Create databases
../pam-docker-compose-shared/create-database.sh "pam-aduser"

docker compose up
