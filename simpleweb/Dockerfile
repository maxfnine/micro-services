#Specify base image
FROM node:alpine

#setting working directory
WORKDIR /usr/app

#install dependencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

#default command
CMD ["npm","start"]