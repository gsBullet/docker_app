FROM node:22.16.0

WORKDIR /var/www/basic1

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 6001

CMD ["npm", "start"]