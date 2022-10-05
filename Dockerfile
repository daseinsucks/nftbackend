FROM node:14.17-alpine

WORKDIR /app

COPY . .

RUN npm install

ENTRYPOINT ["node", "server.js"]

EXPOSE 80