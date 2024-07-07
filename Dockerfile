FROM oven/bun

WORKDIR /app


RUN bun install --production

COPY . .

CMD ["bun", "src/index.ts"]

EXPOSE 3000