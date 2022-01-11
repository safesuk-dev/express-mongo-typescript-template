FROM node:14 as build
WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts
RUN npm i pkg -g

COPY . . 
RUN npm run build
RUN pkg -t host dist/src/index.js


FROM alpine
RUN apk add --no-cache libstdc++ libgcc
WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/index .
CMD ["./index"]