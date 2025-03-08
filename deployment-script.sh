
# เข้าไปที่โฟลเดอร์โปรเจค
cd ~/app

# สร้างไฟล์ที่จำเป็น (หากไม่มี)
echo "สร้างไฟล์ที่จำเป็น..."
if [ ! -f "Dockerfile" ]; then
  echo "สร้างไฟล์ Dockerfile..."
  cat > Dockerfile << 'EOL'
FROM node:18 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOL
fi

if [ ! -f "docker-compose.yml" ]; then
  echo "สร้างไฟล์ docker-compose.yml..."
  cat > docker-compose.yml << 'EOL'
version: '3'
services:
  vue-app:
    build: .
    container_name: my-vue-project
    ports:
      - "80:80"
    restart: always
EOL
fi

if [ ! -f "nginx.conf" ]; then
  echo "สร้างไฟล์ nginx.conf..."
  cat > nginx.conf << 'EOL'
server {
    listen 80;
    server_name localhost;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
EOL
fi

# สร้างและรัน Docker containers
echo "สร้างและรัน Docker containers..."
sudo docker-compose up -d --build

# เปิด firewall ports
echo "ตั้งค่า firewall..."
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

echo "การติดตั้งเสร็จสิ้น!"
echo "คุณสามารถเข้าถึงเว็บไซต์ได้ที่: http://$(curl -s icanhazip.com)"