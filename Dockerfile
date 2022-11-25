FROM node:16

RUN mkdir /app

WORKDIR /app

COPY package* ./

RUN npm i

RUN npm i -g nodemon

COPY . .

ENV NODE_ENV production

ENTRYPOINT [ "npm", "start" ]