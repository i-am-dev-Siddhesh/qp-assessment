FROM node:16.20.0

WORKDIR /app

COPY package*.json yarn.lock ./

COPY . .

RUN yarn

RUN npx prisma generate

RUN yarn build

EXPOSE 8000

CMD ["yarn","start"]