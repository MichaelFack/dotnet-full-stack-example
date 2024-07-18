FROM node:22-alpine
WORKDIR /frontend/
# We assume 'npm run build' has already been done
COPY build/ /frontend/build
# We use 'serve' to serve our prod build - it was suggested a lot.
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
