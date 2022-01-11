FROM node:14 as build
WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts
RUN npm i pkg -g

COPY . . 
RUN npm run build
RUN pkg  -t node14-alpine-x64  dist/src/index.js -o index


FROM alpine
WORKDIR /app

# install required libs
RUN apk add --no-cache libstdc++ libgcc
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app/package.json .
COPY --from=build /app/index .
# default port
EXPOSE 3000

RUN ls
CMD ["./index"]