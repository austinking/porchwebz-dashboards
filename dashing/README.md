# Dashing

Widgets and such for Dashing.io go here

## Development setup

This directory has the `Vagrantfile` with specifics for working on the dashboard service.

    $ vagrant up
    $ vagrant rsync-auto

Create a new shell

    $ vagrant ssh    
    please run 'export DOCKER_HOST=tcp://172.17.8.101:2375 && export VAGRANT=172.17.8.101'
    $ export DOCKER_HOST=tcp://172.17.8.101:2375 && export VAGRANT=172.17.8.101
    $ docker run -v=/home/core/share/jobs:/jobs -v=/home/core/share/widgets:/widgets -v=/home/core/share/dashboards:/dashboards -d -p 8080:3030 frvi/dashing

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


## Deploying

Unlike our development setup... deployment is a different beast.

We start up a Docker container, shove our code into it, and then commit and publish to our
private repo.


### Setup

    docker login

This creates ~/.docker.cfg. Upload this to a private S3 Bucket
Grant Read permissions to `Me`.

AWS Elastic Bean Stock then deploys from our private repo.

    cd porchwebz-dashboards/dashing
    zip ../porchwebz-dashboard.zip -r * .[^.]*


CoreOS has /home/core/share with our dashing/ code.

    $ docker run -v=/home/core/share:/share -d -p 8080:3030 frvi/dashing
    ea481d39ca60
    $ docker exec -i -t ea481d39ca60 bash
    # ./copy_code.sh    
    exit

    #docker commit -m"Update" -a "Austin King" ea481d39ca60 austinking/dashing-deploy

    docker commit -m="Adding henrys widgets" ea481d39ca60 austinking/dashing-deploy:v4
    docker push austinking/dashing-deploy:v4


 Go to [EBS Console](https://console.aws.amazon.com/elasticbeanstalk/?region=us-east-1#/environment/dashboard?applicationName=dashboards.porchwebz.com&environmentId=e-rxcqtwrb6r)

 Upload our Dockerfile.json and bump the version number


 ssh into production

    ssh austink@management.prod.porch.com
    ssh appdocker00.qa

     ssh -i ../porchwebz-dashboards/dashing/porchwebzcom.pem ec2-user@dashboards.bower.porchwebz.com