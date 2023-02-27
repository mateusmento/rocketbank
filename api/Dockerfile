FROM node:18-alpine AS dev

WORKDIR /usr/app
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .

FROM node:18-alpine AS build

WORKDIR /usr/app
COPY --from=dev --chown=node:node /usr/app .
RUN npm run build
USER node

FROM node:18-alpine AS prod

WORKDIR /usr/app
COPY --from=build --chown=node:node /usr/app/package*.json ./
RUN npm ci --omit=dev
COPY --from=build --chown=node:node /usr/app/dist ./dist
USER node

CMD ["npm", "run", "start:prod"]
