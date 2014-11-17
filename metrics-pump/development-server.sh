#!/bin/bash
docker stop metrics-pump
docker rm metrics-pump
docker run -d -it --name='metrics-pump' --volume=`pwd`/src:/data/src porch/metrics-pump:latest