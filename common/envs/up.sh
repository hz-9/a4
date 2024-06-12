#!/bin/bash

root=$(cd `dirname $0`; dirname `pwd`)

docker-compose --env-file ${root}/envs/.env.dev -p a4 -f ${root}/envs/docker-compose.yml up -d
