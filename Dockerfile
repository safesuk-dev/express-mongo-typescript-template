# set default as x64, for pi need to use arm64
ARG ARCH_DEFAULT=x64

FROM node:14 as build
WORKDIR /app
ARG ARCH_DEFAULT
ENV NODE node14
ENV PLATFORM alpine
RUN ARCH=$ARCH_DEFAULT

COPY package*.json ./
COPY yarn.lock ./

RUN yarn --ignore-scripts
RUN npm i pkg  -g


COPY . .
RUN yarn build
RUN echo ${ARCH}
# *** if use build:tsc it will be dist/src/index.js ***
RUN pkg -t ${NODE}-${PLATFORM}-${ARCH}  dist/index.js -o index


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