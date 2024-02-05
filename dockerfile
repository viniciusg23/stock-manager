FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/App.js"]