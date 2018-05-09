FROM node:8

WORKDIR /usr/src
ADD     ./app /usr/src/app
ADD     ./package.json /usr/src
ADD     ./yarn.lock /usr/src

RUN yarn

ADD     ./test /usr/src/test

CMD ["npm", "start"]
