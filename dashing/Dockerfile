FROM frvi/dashing

RUN apt-get update
RUN apt-get install -y aptitude emacs procps less

ADD dashboards/ /dashing/dashboards
ADD widgets/ /dashing/widgets


EXPOSE 3030
