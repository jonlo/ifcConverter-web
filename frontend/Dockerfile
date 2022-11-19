FROM node:14 as build
WORKDIR /src
ADD . /src
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "node", "server.js" ]
