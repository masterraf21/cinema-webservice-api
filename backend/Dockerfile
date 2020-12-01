# Builder stage
FROM node:15.3.0-alpine3.10 AS ts-builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src src
ENV DATABASE=mongodb://mongodb:27017/cinema
RUN npm run build

# Production stage
FROM node:15.3.0-alpine3.10 AS ts-production
ENV PORT=3000
ENV NODE_ENV=production
RUN apk add --no-cache tini
WORKDIR /usr/src/app
RUN chown node:node
USER node
COPY package*.json ./
RUN npm install
COPY --from=ts-builder /usr/src/app/lib lib/
EXPOSE ${PORT}
ENTRYPOINT [ "/sbin/tini","--","node","lib/Server.js" ]















