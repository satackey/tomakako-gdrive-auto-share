FROM node:14.4.0-slim

RUN set -x \
    && mkdir -p /usr/share/man/man1 \
    && apt-get update; apt-get install -y software-properties-common gnupg \
    && apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 0xB1998361219BD9C9 \
    && apt-add-repository 'deb http://repos.azulsystems.com/debian stable main' \
    && apt-get update \
    && apt-get install -y zulu-13 sudo

RUN curl -sL firebase.tools | bash \
    && firebase setup:emulators:firestore

WORKDIR /app/functions
COPY functions/package.json functions/yarn.lock ./
RUN yarn install --frozen-lockfile

WORKDIR /app
