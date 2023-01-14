FROM node:18-alpine AS dev

WORKDIR /home/weektasks-api
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node

FROM node:18-alpine AS build

WORKDIR /home/weektasks-api
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=dev /home/weektasks-api/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --omit=dev && npm cache clean --force
USER node

FROM node:18-alpine AS prod

WORKDIR /home/weektasks-api

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=build /home/weektasks-api/node_modules ./node_modules
COPY --chown=node:node --from=build /home/weektasks-api/dist ./dist

CMD ["node", "dist/main.js"]
