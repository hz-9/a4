#!/bin/bash

root=$(cd `dirname $0`; dirname `pwd`)

docker-compose -p a4 -f ${root}/envs/docker-compose.yml down --rmi local 