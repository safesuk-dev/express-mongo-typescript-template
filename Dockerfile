FROM node:14 as build
WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts
RUN npm i pkg -g
ENV NODE node14
ENV PLATFORM alpine
RUN ARCH=$(dpkg --print-architecture)
RUN echo ${ARCH}
RUN if [ ARCH = "amd64" ] ; then ARCH = "arm64"; fi

COPY . . 
RUN npm run build
RUN pkg -t ${NODE}-${PLATFORM}-$(ARCH)  dist/src/index.js -o index


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