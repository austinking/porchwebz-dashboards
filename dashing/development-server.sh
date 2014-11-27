#!/usr/bin/env bash
DASHING_HOME=`pwd`

docker stop porch-dashboard
docker rm porch-dashboard

docker build --tag=porch-dashing:dev .

docker run -d \
    --name=porch-dashboard \
    -v=$DASHING_HOME/assets:/dashing/assets \
    -v=$DASHING_HOME/config:/dashing/config \
    -v=$DASHING_HOME/dashboards:/dashing/dashboards \
    -v=$DASHING_HOME/jobs:/dashing/jobs \
    -v=$DASHING_HOME/widgets:/dashing/widgets \
    -p=3030:3030 porch-dashing:dev
