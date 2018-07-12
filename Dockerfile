FROM node:8.5
WORKDIR /usr/leadcoin/backend
COPY  ./backend ./

# We need the API from the frontend for testings...
COPY  ./frontend ../frontend

# A default .env. Should be overridden by docker when you executing it.
# for e.g. "sudo docker run -v /home/build/.env:/usr/leadcoin/backend/.env --network host --name backend --rm leadcoin/leadcoin
copy ./backend/.env.example ./.env
RUN npm i > /dev/null

CMD ["npm", "start"]
