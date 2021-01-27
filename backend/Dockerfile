# https://github.com/typeorm/typeorm/issues/5949
FROM node:12-alpine

WORKDIR /usr/app
COPY package.json .

RUN npm install -g ts-node typeorm

RUN npm install

COPY . .

CMD ["npm", "start"]