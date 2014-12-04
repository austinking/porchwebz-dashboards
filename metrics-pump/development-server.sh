#!/bin/bash
docker stop metrics-pump > /dev/null 2>&1
docker rm metrics-pump > /dev/null 2>&1
docker build --tag='porch/metrics-pump:latest' .
docker run -d -it --name='metrics-pump' --volume=`pwd`/src:/data/src porch/metrics-pump:latest