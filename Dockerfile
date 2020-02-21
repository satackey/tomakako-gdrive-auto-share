FROM node:8.17.0-alpine

RUN yarn global add firebase-tools

WORKDIR /app/functions
COPY functions/package.json functions/yarn.lock ./
RUN yarn install --frozen-lockfile

WORKDIR /app