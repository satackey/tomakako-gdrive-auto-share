FROM node:12.20.1-alpine

RUN yarn global add create-react-app

WORKDIR /app/hosting
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
