from node:9.0-alpine

WORKDIR /usr/app

COPY . .

RUN npm install

# EXPOSE 5000

CMD ["npm", "start"]

