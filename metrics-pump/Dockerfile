FROM dockerfile/nodejs

# Useful if you need to ssh in and hack around
RUN apt-get update
#RUN apt-get install -y apt-utils aptitude emacs vim procps less curl

RUN apt-get install -y sqlite cron

RUN npm install sqlite3 underscore request

ADD src/etc/crontab /root/crontab
RUN crontab -u root /root/crontab
ADD src /data/src

RUN mkdir -p /data/src/logs

EXPOSE 3031

RUN echo `date "+%s"`

RUN ["node", "/data/src/bin/cronjob.js"]

RUN ps aux

# RUN ["node","/data/src/bin/metrics_pump.js"]

CMD cron -f