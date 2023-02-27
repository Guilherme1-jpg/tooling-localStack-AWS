FROM node:16-slim

WORKDIR /src

COPY package.json package-lock.json jest.config.js /src/

RUN npm ci --silent

COPY . . 

CMD npm start