FROM node:14-alpine
ARG PORT
ENV PORT=${PORT}
ARG DATABASE
ENV DATABASE=${DATABASE}
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
RUN npm install -g pm2
ADD . /usr/src/app
RUN npm run build
CMD ["npm","run","start:prod"]
EXPOSE ${PORT}
