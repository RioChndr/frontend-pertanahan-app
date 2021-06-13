FROM node:12-alpine

RUN mkdir -p /src

WORKDIR /src

COPY package*.json /src/

RUN npm install

RUN npm install @vue/cli@3.7.0 -g

COPY . .

EXPOSE 4040

CMD [ "npm", "run", "serve" ]
