# ====== 1단계: 빌드 ======
FROM eclipse-temurin:21-jdk-jammy AS build  # ✅ build stage 추가

WORKDIR /app
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./
COPY src src

RUN chmod +x gradlew && ./gradlew clean bootJar -x test  # ✅ bootJar로 빌드, jar 생성

# ====== 2단계: 런타임 ======
FROM eclipse-temurin:21-jdk-jammy  # ✅ runtime stage

WORKDIR /app

# build stage에서 생성된 jar를 가져옴
COPY --from=build /app/build/libs/*.jar app.jar  # ✅ 멀티스테이지 COPY

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
