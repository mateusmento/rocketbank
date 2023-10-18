FROM node:18-alpine AS build

WORKDIR /usr/app
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npx webpack
COPY --chown=node:node src/assets ./dist
USER node

FROM nginx:1.23.3-alpine AS app


COPY --from=build /usr/app/dist /usr/share/nginx/html
