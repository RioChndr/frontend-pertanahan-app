FROM node:14-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install

RUN npm rebuild node-sass

COPY . .

RUN npm install @vue/cli@3.7.0 -g

CMD [ "npm", "run", "serve" ]
