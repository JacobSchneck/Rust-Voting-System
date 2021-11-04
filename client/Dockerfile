# Install dependencies only when needed
FROM node:alpine

RUN mkdir -p /usr/src/app
ENV PORT 3000

WORKDIR /usr/src/app


# Production use node instead of root
# USER node

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app/

RUN yarn install --production

COPY . /usr/src/app

RUN yarn build

EXPOSE 3000

# CMD ["node_modules/.bin/next", "dev"]
CMD ["yarn", "start"]
