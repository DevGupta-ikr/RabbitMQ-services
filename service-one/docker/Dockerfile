# syntax=docker/dockerfile:1

ARG IMAGE_VERSION=1.0.0

FROM node:lts

LABEL name="Service One"
LABEL description=""
LABEL version="${IMAGE_VERSION}"
LABEL maintainer="Dev Kumar Gupta"

WORKDIR /app

COPY ./src ./src
COPY ./@types ./@types
COPY ./babel.config.js ./tsconfig.json ./package.json ./package-lock.json ./
RUN npm install
RUN npm run build
RUN rm -rvf ./node_modules ./src ./@types ./tsconfig.json ./babel.config.js ./package-lock.json
RUN npm install --omit=dev

ENTRYPOINT node ./build/main.js
