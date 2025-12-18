# Node.js 20 사용
FROM node:20

WORKDIR /app

# 의존성 파일 복사 후 설치
COPY package.json package-lock.json ./
RUN npm install

# 소스 복사
COPY . .

# 빌드
RUN npm run build

# 앱 실행 (개발용은 필요시 변경)
EXPOSE 3000
CMD ["npm", "start"]
