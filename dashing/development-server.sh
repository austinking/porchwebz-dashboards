#!/usr/bin/env bash
DASHING_HOME=`pwd`
echo $DASHING_HOME
docker run -d \
    -v=$DASHING_HOME/assets:/dashing/assets \
    -v=$DASHING_HOME/config:/dashing/config \
    -v=$DASHING_HOME/dashboards:/dashing/dashboards \
    -v=$DASHING_HOME/jobs:/dashing/jobs \
    -v=$DASHING_HOME/widgets:/dashing/widgets \
    -p=3030:3030 $DASHING_DEV