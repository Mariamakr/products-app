#ftiakse ena container poy na trexei mono to node 18 
FROM node:18
WORKDIR /usr/src/app

# tha diavasei kai tha egkatastisei oles tis vivliothikes poy thelo
COPY package*.json ./
RUN npm install

# afou tis diavasei tha pei pare ola ta arxeia kai antegrapse ta ekei mesa..
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]

