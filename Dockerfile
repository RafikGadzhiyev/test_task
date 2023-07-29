FROM node:18.17-alpine AS node_base

FROM node_base AS deps
WORKDIR /usr/app
COPY package.json /usr/app/package.json
COPY package-lock.json /usr/app/package-lock.json
RUN npm instal

FROM node_base as build
WORKDIR /usr/app
COPY --from=deps /usr/app/node_modules  /usr/app/node_modules 
COPY . /usr/app/
RUN npm run build

FROM scratch AS ui
COPY --from=build /usr/app/.next /usr/app