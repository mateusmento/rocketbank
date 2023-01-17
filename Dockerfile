FROM node:18-alpine AS build

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npx webpack
USER node

FROM nginx:1.23.3-alpine AS app

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
