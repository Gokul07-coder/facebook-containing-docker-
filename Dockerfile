FROM debian

FROM node:18-alpine

FROM mysql:8.0.32-debian

WORKDIR /FACEBOOK

COPY . .

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm 

RUN npm install

EXPOSE 8000

CMD [ "npm", "start" ]

