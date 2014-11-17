#!/bin/bash
docker run --name='metrics-pump' -it --rm --volume=`pwd`/src:/src porch/metrics-pump:latest