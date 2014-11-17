FROM dockerfile/nodejs

# Useful if you need to ssh in and hack around
RUN apt-get update
#RUN apt-get install -y apt-utils aptitude emacs vim procps less curl

RUN apt-get install -y sqlite

RUN npm install sqlite3

EXPOSE 3031