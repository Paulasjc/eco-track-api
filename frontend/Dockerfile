FROM node:20-alpine

WORKDIR /app

# Recibimos la URL del backend en build time y la exponemos para Next.js
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Instalamos dependencias primero para aprovechar la caché
COPY package.json package-lock.json ./
RUN npm ci

# Copiamos el resto del código de la app
COPY . .

# Build de la aplicación Next.js (usa NEXT_PUBLIC_API_URL en tiempo de build)
RUN npm run build

# A partir de aquí, entorno de producción para runtime
ENV NODE_ENV=production

# Next.js app en el puerto 3000
EXPOSE 3000

CMD ["npm", "start"]
