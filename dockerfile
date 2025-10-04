FROM node:22.16.0

WORKDIR /var/www/basic_node_app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 6001

CMD ["npm", "start"]
