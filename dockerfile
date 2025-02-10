FROM node:18

RUN apt-get update && apt-get install -y build-essential

WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]