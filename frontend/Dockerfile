FROM node:20-alpine AS builder

WORKDIR /app

# 1. Instalamos dependencias 
COPY package.json package-lock.json ./
RUN npm ci

# 2. Copiamos el resto del código
COPY . .

# 3. ARGUMENTOS DE CONSTRUCCIÓN
# Esta URL debe ser la URL pública del backend en la nube 
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# 4. Construimos la aplicación

RUN npm run build

# --- ETAPA DE RUNTIME ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copiar solo lo necesario para que la imagen sea ligera
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Al igual que en el back, el puerto debe ser dinámico
ENV PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "npm start -- -p ${PORT}"]