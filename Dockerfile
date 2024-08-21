# Usar una imagen oficial de Node.js como base
FROM node:18-alpine as builder

# Directorio en el que se ubicará nuestra aplicación dentro del contenedor
WORKDIR /usr/src/app

# Copiar package.json y pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Instalar las dependencias del proyecto
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin
RUN pnpm install --frozen-lockfile

# Copiar el resto del código fuente de la aplicación
COPY . .

# Compila la aplicación
RUN npm run build

# Usar multistage build para construir la app a producción
FROM node:18-alpine as production

# Directorio en el que se ubicará nuestra aplicación dentro del contenedor
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

# Exponer el puerto que usará tu aplicación (3000 es el puerto predeterminado para Nest.js)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD [ "node", "dist/src/main.js" ]
