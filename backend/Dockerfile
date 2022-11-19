FROM ubuntu:22.04 as build
WORKDIR /src
RUN apt update -y
RUN apt-get install build-essential -y
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt -y install nodejs
ADD . /src
EXPOSE 3005
CMD [ "npm", "run", "start" ]