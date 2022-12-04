FROM node:14 as build
WORKDIR /src
ADD . /src
RUN npm install
RUN npm install pm2 -g
RUN npm run build
EXPOSE 3000
CMD [ "pm2-runtime", "server.js" ]
