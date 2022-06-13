# base
FROM node:16-alpine AS base

RUN apk update && \
    apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata

ENV TZ=Asia/Tokyo

WORKDIR /app

# development
FROM base as dev

ENV PS1='\h /\W\ # '

CMD ["bash"]
