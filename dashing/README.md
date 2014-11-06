# Dashing

Widgets and such for Dashing.io go here

## Setup

This directory has the `Vagrantfile` with specifics for working on the dashboard service.

    $ vagrant up
    $ vagrant ssh
    please run 'export DOCKER_HOST=tcp://172.17.8.101:2375 && export VAGRANT=172.17.8.101'
    $ export DOCKER_HOST=tcp://172.17.8.101:2375 && export VAGRANT=172.17.8.101
    $ docker run -v=/home/core/share/dashboards:/dashboards -d -p 8080:3030 frvi/dashing

    384c3e628aa88a1f7b1c2bb0beeb7d51d92de82e2d6482a3fc6df778fb7c0403

You should probably throw `export DOCKER_HOST=tcp://172.17.8.101:2375 && export VAGRANT=172.17.8.101` into your `.bash_profile`

You can now load http://localhost:8080/


## Hacking

If you want to see what is going on inside of the frvi/dashing container, do

    docker exec -i -t 384c3e628aa88a /bin/bash


See [frvi/dashing](https://registry.hub.docker.com/u/frvi/dashing/) for further configuration and ways to launch
this dockerized dashing.


## Troubleshooting

* docker server isn't running in CoreOS

    $ vagrant ssh
    $ sudo systemctl restart docker