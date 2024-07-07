FROM oven/bun

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

RUN bun install --production

COPY . .

CMD ["bun", "src/index.ts"]

EXPOSE 3000