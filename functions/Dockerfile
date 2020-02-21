FROM node:8.17.0-alpine

WORKDIR /app/functions
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
