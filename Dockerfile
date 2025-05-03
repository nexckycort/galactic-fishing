FROM node:lts-alpine

WORKDIR /app/

COPY apps/bot/dist/index.js /app

ENTRYPOINT ["node", "index.js"]