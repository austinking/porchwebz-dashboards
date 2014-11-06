# porchwebz-dashboards


Code and config that powers dashboards.porchwebz.com

## Setup

Edit porch-vagrant/Vagrantfile and add

    config.vm.network :forwarded_port, guest: 8080, host: 8080

Now execute:
    vagrant reload
    $ docker run -d -p 8080:3030 frvi/dashing
    384c3e628aa88a1f7b1c2bb0beeb7d51d92de82e2d6482a3fc6df778fb7c0403


You can now load http://localhost:8080/


## Hacking

If you want to see what is going on inside of the frvi/dashing container, do

    docker exec -i -t 384c3e628aa88a /bin/bash


See [frvi/dashing](https://registry.hub.docker.com/u/frvi/dashing/) for further configuration and ways to launch
this dockerized dashing.