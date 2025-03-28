FROM node:18-alpine

RUN apk update
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ENV DIRECTUS_URL=https://clic.epfl.ch/directus
ENV NEXT_PUBLIC_DIRECTUS_URL=https://clic.epfl.ch/directus

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm ci --only=production --ignore-scripts

COPY . .

# Build without pre-rendering. This would cause issue as the build does not have access to directus.
RUN npm run build -- --experimental-build-mode compile

# switch to unprivileged user from node base image
RUN chown -R node .
USER node

CMD [ "npm", "start" ]
