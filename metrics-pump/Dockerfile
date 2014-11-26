FROM dockerfile/nodejs

# Useful if you need to ssh in and hack around
RUN apt-get update
#RUN apt-get install -y apt-utils aptitude emacs vim procps less curl

RUN apt-get install -y sqlite cron

RUN npm install sqlite3

ADD src/etc/crontab /root/crontab
RUN crontab -u root /root/crontab

RUN mkdir /data/logs

EXPOSE 3031

#CMD ["node","/data/src/bin/metrics_pump.js"]
CMD ["node", "/data/src/bin/cronjob.js"]