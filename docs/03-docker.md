# 1. Docker를 사용하는 이유

Docker를 사용하는 이유는 다음과 같습니다.

- 로컬 개발 환경과 배포 환경을 **일관되게 유지**할 수 있음
- 프론트엔드, 백엔드, 데이터베이스를 각각 **컨테이너로 분리**하여 실행 가능
- 환경 변수, 포트, 네트워크 설정을 통일하여 **환경 차이로 인한 문제 최소화**
- 컨테이너를 사용하면 로컬에서 테스트 후 **AWS EC2 등 다른 서버로 그대로 배포** 가능

# 2. Backend Dockerfile 설명

사용된 Backend Dockerfile은 **멀티스테이지 빌드**로 구성되어 있습니다.

## 1단계: 빌드(Build Stage)

```dockerfile
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./
COPY src src
RUN chmod +x gradlew && ./gradlew clean bootJar -x test

FROM eclipse-temurin:21-jdk-jammy AS build : JDK 21 기반 빌드용 이미지 지정
WORKDIR /app : 컨테이너 내 작업 디렉토리 설정
COPY ... : Gradle 빌드 관련 파일과 소스코드를 컨테이너로 복사
RUN chmod +x gradlew && ./gradlew clean bootJar -x test : 실행 권한 부여 후 Spring Boot Jar 빌드
```

## 2단계: 런타임(Runtime Stage)

```dockerfile
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]

FROM eclipse-temurin:21-jdk-jammy : 런타임용 JDK 이미지
COPY --from=build ... : 빌드 단계에서 생성된 jar 파일 복사
EXPOSE 8080 : 컨테이너 포트 8080 노출
CMD ["java", "-jar", "app.jar"] : 컨테이너 실행 시 애플리케이션 시작
```

# 3. Frontend Dockerfile 설명

```dockerfile
FROM node:20
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

FROM node:20 : Node.js 20 기반 이미지 사용
WORKDIR /app : 컨테이너 작업 디렉토리 설정
COPY package*.json ./ : 의존성 파일 복사
RUN npm install : 프로젝트 의존성 설치
COPY . . : 소스 전체 복사
RUN npm run build : 프로젝트 빌드 (Next.js/React)
EXPOSE 3000 : 컨테이너 포트 3000 노출
CMD ["npm", "start"] : 빌드된 앱 실행
빌드 과정 : Node 설치 → 의존성 설치 → 소스 복사 → 빌드
실행 과정 : 컨테이너 시작 시 앱 실행 (npm start)
```

# Docker Compose 설명

현재 docker-compose 예시는 **백엔드, 프론트엔드, MySQL**을 함께 실행하도록 구성되어 있습니다.

```yaml
version: "3.8"
services:
  mysql:
    image: mysql:8.0
    container_name: guestbook-mysql
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
  backend:
    build: ./GuestBook-backend
    ports:
      - "8080:8080"
    depends_on:
      - mysql
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/${DB_NAME}
      SPRING_DATASOURCE_USERNAME: ${DB_USER}
      SPRING_DATASOURCE_PASSWORD: ${DB_PASSWORD}
  frontend:
    build: ./guestbook-frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
volumes:
  mysql-data:
```

여러 컨테이너를 동시에 실행하고 서로 연결되도록 관리

환경변수(.env)를 활용하여 DB 계정, 비밀번호, 데이터베이스 이름 등을 중앙 관리 가능

현재 진행 중인 작업 : 환경(local, docker, AWS)에 따라 다른 docker-compose 파일 분리

로컬 개발용 docker-compose.local.yml

도커 테스트용 docker-compose.dev.yml

배포용(production) docker-compose.prod.yml (CI/CD에서 참조)

이렇게 구성하면 환경별로 필요한 설정만 바꿔서 실행할 수 있습니다.
