FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app
COPY build/libs/GuestBook-backend-0.0.1-SNAPSHOT.jar app.jar

ENV SPRING_PROFILES_ACTIVE=docker

ENTRYPOINT ["java", "-jar", "app.jar"]
