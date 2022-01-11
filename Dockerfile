ARG ARCH_DEFAULT=x64

FROM node:14 as build
WORKDIR /app
ARG ARCH_DEFAULT
ENV NODE node14
ENV PLATFORM alpine
RUN ARCH=$ARCH_DEFAULT

COPY package*.json ./
RUN npm ci --ignore-scripts
RUN npm i pkg -g

# RUN ARCH=$(dpkg --print-architecture)
# RUN echo ${ARCH}
# RUN if [ ARCH = "amd64" ] ; then ARCH = "arm64"; fi

COPY . . 
RUN npm run build
RUN echo $(ARCH)
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