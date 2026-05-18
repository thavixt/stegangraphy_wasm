FROM node:24.12.0

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    # && apt-get install golang-go
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

# Copy the official wasm_exec.js from the Go distribution to the public folder
RUN cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" ./public/

EXPOSE 4123
# CMD ["sh", "-c", "npm run wasm:build && npm run dev"]
CMD ["sh", "-c", "npm run dev:app"]
