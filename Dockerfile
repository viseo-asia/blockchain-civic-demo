FROM node:8.9.4-alpine

# RUN apk add --update --no-cache curl

ENV APP_DIR=/srv/app
ENV NODE_ENV=production

# nodejs package cache
COPY package.json /tmp/package.json
COPY package-lock.json /tmp/package-lock.json
COPY yarn.lock /tmp/yarn.lock

RUN \
    cd /tmp && \
    # npm install --production && \
    yarn install --production && \
    # npm cache verify
    yarn cache clean

RUN \
  mkdir -p ${APP_DIR} && \
  mkdir ${APP_DIR}/log && \
  cp -a /tmp/node_modules/ ${APP_DIR}

# Application setup
COPY app ${APP_DIR}/bin
COPY config ${APP_DIR}/public
COPY test ${APP_DIR}/routes
COPY .env ${APP_DIR}/.env
COPY index.js ${APP_DIR}/index.js
COPY package.json ${APP_DIR}/package.json
COPY package-lock.json ${APP_DIR}/package-lock.json
COPY yarn.lock ${APP_DIR}/yarn.lock

RUN addgroup www-data
RUN adduser -G www-data -D -H www-data
RUN chown -R www-data:www-data ${APP_DIR}

USER www-data

WORKDIR ${APP_DIR}

EXPOSE 3000

CMD ["npm", "start"]
