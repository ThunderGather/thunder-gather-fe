FROM krmp-d2hub-idock.9rum.cc/goorm/node:20.16.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

RUN npm i -g serve

EXPOSE 3000

CMD ["serve", "dist"]