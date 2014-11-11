# Dashing

Widgets and such for Dashing.io go here

## Development

Install boot2Docker

1. Download boot2docker here: http://boot2docker.io/
1. Install package
1. Run boot2docker to initialize VM (it's installed in /Applications)
1. Export the things that boot2docker tells you to export

run these commands (note you'll have to change the export to the id of the docker instance returne in line 2): 

    $ docker build --tag='porch-dashing:dev' .
    $ docker images | grep ' dev '
    porch-dashing              dev                 f2b50ca5ae49        About a minute ago   473.2 MB
    $ export DASHING_DEV=f2b50ca5ae49
    $ ./development-server.sh

Development server will launch our development instance with various folders setup for live reload.

**NOTE:** You must do port forwarding for port `3030` and you must share this current folder in the same path on your VirtualBox Docker Server OS. Otherwise use `development-server.sh` as a guide, but run the server directly with different arguments.

## Deployment


## Docker on Mac OS X

You can use either boot2docker or `porch-vagrant`.

boot2docker is the prefered and supported configuration.

### boot2docker tips

You need to tell boot2docker to forward port 3030

    $ boot2docker stop
    $ VBoxManage modifyvm "boot2docker-vm" --natpf1 "guestnginx,tcp,,3030,,3030"
    $ boot2docker start

### porch-vagrant tips

This directory has the `Vagrantfile` with specifics for working on the dashboard service.

    $ vagrant up
    $ vagrant rsync-auto

Create a new shell

    $ vagrant ssh    
    please run 'export DOCKER_HOST=tcp://172.17.8.101:2375 && export VAGRANT=172.17.8.101'
    $ export DOCKER_HOST=tcp://172.17.8.101:2375 && export VAGRANT=172.17.8.101
    $ docker run -v=/home/core/share/jobs:/jobs -v=/home/core/share/widgets:/widgets -v=/home/core/share/dashboards:/dashboards -v=/home/core/share/assets:/assets -d -p 8080:3030 frvi/dashing
    
*note: mounting assets dir was wonky, we got around it by explicitly mounting to /dashing/assets, but needs more investigation as to why it was being handled differently than the other mounted dirs*

You should probably throw `export DOCKER_HOST=tcp://172.17.8.101:2375 && export VAGRANT=172.17.8.101` into your `.bash_profile`

You can now load http://localhost:8080/


## Hacking Tips

If you want to see what is going on inside of the frvi/dashing container, do

    docker exec -i -t porch-dashing /bin/bash


See [frvi/dashing](https://registry.hub.docker.com/u/frvi/dashing/) for further configuration and ways to launch
this dockerized dashing.


## Troubleshooting

* docker server isn't running in CoreOS

    $ vagrant ssh
    $ sudo systemctl restart docker


## Deploying

Unlike our development setup... deployment is a slightly different beast.

We update our got in git to a certain state and then build an image and launch it.


## Setup

    $ ssh management.prod.porch.com
    $ ssh appdocker00.prod
    $ git clone https://github.com/austinking/porchwebz-dashboards.git
    $ cd porchwebz-dashboards/dashing/
    $ sudo docker pull frvi/dashing


## Deploying new code
    $ git pull origin master
    $ sudo docker build --tag=porch/dashboards:latest .
    Successfully built da6e21eb536c    
    $ sudo ./production-server.sh

## Stop / Restart / View logs

    $ sudo docker start porch-dashboards
    $ sudo docker logs -f porch-dashboards
    $ sudo docker stop porch-dashboards