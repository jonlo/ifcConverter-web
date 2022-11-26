FROM ubuntu:22.04 as build
RUN apt update -y
RUN apt-get install build-essential -y
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt -y install nodejs
RUN npm install
RUN npm install pm2 -g
ADD . /
EXPOSE 3010
CMD [ "pm2-runtime", "npm", "--", "start" ]