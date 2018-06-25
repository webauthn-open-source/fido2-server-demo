# production app
FROM node:10 as production
LABEL maintainer="apowers@ato.ms"
WORKDIR /usr/src/app
COPY package.json scm-config.json /usr/src/app/
COPY webauthn-yubiclone/ /usr/src/app/webauthn-yubiclone/
# RUN npm install --only=production
RUN npm install
EXPOSE 8888
EXPOSE 8443
ENTRYPOINT ["npm", "start"]

# dev / testing
FROM node:10 as test
LABEL maintainer="apowers@ato.ms"
WORKDIR /usr/src/app
COPY --from=production /usr/src/app/ /usr/src/app/
COPY test/ /usr/src/app/test/
# RUN npm install --only=development
EXPOSE 8888
EXPOSE 8443
ENTRYPOINT ["npm", "test"]