FROM node:12.21.0-alpine

RUN yarn global add create-react-app

WORKDIR /app/hosting
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
