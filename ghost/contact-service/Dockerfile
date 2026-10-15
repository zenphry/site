ARG BUILDPLATFORM

FROM --platform=$BUILDPLATFORM node:24-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1 AS dependencies

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:24-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1

WORKDIR /app
COPY --chown=node:node package.json package-lock.json ./
COPY --from=dependencies --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node server.js ./
USER node
EXPOSE 3000
CMD ["node", "server.js"]
