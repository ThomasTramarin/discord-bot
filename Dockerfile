# build stage
FROM node:20-alpine AS builder

WORKDIR /app
    
COPY package*.json ./
RUN npm install
    
COPY . .
RUN npx prisma generate


RUN npm run build
    
# production stage
FROM node:20-alpine AS production
    
WORKDIR /app

ENV NODE_ENV=production
    
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma 
    
  
RUN npm install --omit=dev --ignore-scripts
    
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]