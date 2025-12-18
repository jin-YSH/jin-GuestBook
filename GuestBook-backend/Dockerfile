FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app
COPY build/libs/*.jar app.jar


ENV SPRING_PROFILES_ACTIVE=docker

ENTRYPOINT ["java", "-jar", "app.jar"]
