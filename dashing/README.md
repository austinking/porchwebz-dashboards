# Dashing

Widgets and such for Dashing.io go here

## Development

Assuming your in the `dashing` directory

    $ docker build --tag=porch-dashing:dev .
    $ ./development-server.sh
    6f20e02420afd214ae97cefeb8d4bc5a21f3207b3ecec2e7621137fd1c477fdc
    $ docker restart porch-dashboard
    $ docker logs -f porch-dashboard
    $ docker exec -i -t porch-dashboard /bin/bash

Development server will launch our development instance with various folders setup for live reload.

**NOTE:** You must do port forwarding for port `3030` and you must share this current folder in the same path on your VirtualBox Docker Server OS. Otherwise use `development-server.sh` as a guide, but run the server directly with different arguments.

### Docker on Mac OS X

You can use either boot2docker or `porch-vagrant`.

boot2docker is the prefered and supported configuration.

### boot2docker tips

You need to tell boot2docker to forward port 3030

    $ boot2docker stop
    $ VBoxManage modifyvm "boot2docker-vm" --natpf1 "guestnginx,tcp,,3030,,3030"
    $ boot2docker start

## Deploying

Unlike our development setup... deployment is a slightly different beast.

We update our code in git to a certain state and then build an image and launch it.


## One Time Setup

    $ ssh management.prod.porch.com
    $ ssh appdocker00.prod
    $ git clone https://github.com/austinking/porchwebz-dashboards.git
    $ cd porchwebz-dashboards/dashing/
    $ sudo docker pull frvi/dashing

## Deploying Service

    $ ssh management.prod.porch.com
    $ ssh appdocker00.prod
    $ cd  porchwebz-dashboards/dashing/
    $ git pull origin master
    $ docker stop porch-dashboards
    $ docker rm porch-dashboards    
    $ sudo docker build --tag=porch/dashboards:latest .
    Successfully built da6e21eb536c    
    $ sudo ./production-server.sh

## Stop / Restart / View logs

    $ sudo docker start porch-dashboards
    
    $ sudo docker stop porch-dashboards

## Troubleshooting

See [frvi/dashing](https://registry.hub.docker.com/u/frvi/dashing/) for further configuration and ways to launch
this dockerized dashing.


* I'm using `porch-vagrant` and docker server isn't running in CoreOS

    $ vagrant ssh
    $ sudo systemctl restart docker

* docker gives this error

    $ ./development-server.sh
    2014/11/11 16:03:14 Error response from daemon: Conflict, The name porch-dashboard is already assigned to 24ada25dc825. You have to delete (or rename) that container to be able to assign porch-dashboard to a container again.
    $ docker rm 24ada25dc825
    24ada25dc825
    $ ./development-server.sh
    e981921613432574a65b7e5108b6bca9adeebc1e61086345a6a41a3d47f47758

The `docker rm` with the container id in the error message will fix this.