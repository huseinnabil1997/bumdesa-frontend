# Gunakan image node:18-alpine sebagai dasar
FROM node:18-alpine

# Set working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependensi npm
RUN npm install --force

# Salin semua file sumber ke direktori kerja di dalam container
COPY . .

# Build aplikasi ReactJS
RUN npm run build

# Expose port yang akan digunakan oleh aplikasi
EXPOSE 3031

# Perintah untuk menjalankan aplikasi ketika container dijalankan
CMD [ "npm", "start" ]