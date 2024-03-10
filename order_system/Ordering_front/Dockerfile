#FROM node:20
#
#WORKDIR /app
#
#COPY . .
##COPY public public
##COPY src src
##COPY .env .
##COPY babel.config.js .
##COPY jsconfig.json .
##COPY package-lock.json .
##COPY package.json .
##COPY vue.config.js .
#
#RUN npm install
#
#ENTRYPOINT [ "npm", "run", "serve" ]

# Starting from Node 20 base image
FROM node:20

# Setting the working directory
WORKDIR /app

# Copying package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copying the rest of the code
COPY . .

# Default command to run on container start
ENTRYPOINT [ "npm", "run", "serve" ]