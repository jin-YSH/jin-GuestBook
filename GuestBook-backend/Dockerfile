# OpenJDK 21 사용
FROM eclipse-temurin:21-jdk-jammy

# 작업 디렉토리 설정
WORKDIR /app

# Gradle Wrapper와 설정 파일 복사
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

# 소스 코드 복사
COPY src src

# Gradle 빌드
RUN chmod +x gradlew && ./gradlew clean build -x test

# 빌드된 jar를 컨테이너에 복사
COPY build/libs/*.jar app.jar

# Spring 프로파일 지정 (docker용)
ENV SPRING_PROFILES_ACTIVE=docker

# 포트 오픈
EXPOSE 8080

# 실행 커맨드
CMD ["java", "-jar", "app.jar"]
