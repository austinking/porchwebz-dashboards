FROM frvi/dashing

# Useful if you need to ssh in and hack around
#RUN apt-get update
#RUN apt-get install -y apt-utils aptitude emacs vim procps less curl

ADD assets /dashing/assets
ADD config /dashing/config
ADD dashboards /dashing/dashboards
ADD jobs /dashing/jobs
ADD widgets /dashing/widgets

EXPOSE 3030