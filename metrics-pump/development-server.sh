#!/bin/bash
docker stop metrics-pump
docker rm metrics-pump
docker build --tag='porch/metrics-pump:latest' .
docker run -d -it --name='metrics-pump' --volume=`pwd`/src:/data/src porch/metrics-pump:latest