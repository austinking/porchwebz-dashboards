# porchwebz-dashboards


Code and config that powers dashboards.porchwebz.com

## Setup

Edit porch-vagrant/Vagrantfile and add

    config.vm.network :forwarded_port, guest: 8080, host: 8080
    vagrant reload
    docker run -d -p 8080:3030 frvi/dashing

Load http://localhost:8080/


See [frvi/dashing](https://registry.hub.docker.com/u/frvi/dashing/) for further configuration and ways to launch
this dockerized dashing.