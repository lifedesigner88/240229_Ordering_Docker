#FROM openjdk:11 as stage1
#
#WORKDIR /app
#
## gradle 빌드시에 필요한 파일들을 workdir로 copy
## /app/gradlew 파일, gradle 폴더, build.gradle 파일 등등
#COPY . .
##
##COPY gradlew .
##COPY gradle gradle
##COPY build.gradle .
##COPY settings.gradle .
##COPY src src
#
## /app/build/libs/*.jar 파일 아래 명령어를 통해서 생성
#RUN ./gradlew bootJar
#
#FROM openjdk:11
#
#WORKDIR /app
#
#COPY --from=stage1 /app/build/libs/*.jar app.jar
#
##docker run -d -p 8080:8080 -v C:/Users/LifeD/IdeaProjects/Ordering_Docker/temp:/temp order_backend:v1
#VOLUME /tmp
#
## CMD 또는 ENTRYPOINT를 통해서 컨테이너를 실행
#ENTRYPOINT [ "java", "-jar", "app.jar" ]

#
# docker 실행시 db 정보를 환경변수로 주입
# docker run -d -p 8080:8080 -e SPRING_DATASOURCE_URL=jdbc:mariadb://host.docker.internal:3306/ordering -v C:/Users/LifeD/IdeaProjects/Ordering_Docker/temp:/temp order_backend:v1



# Stage 1: Gradle build
FROM openjdk:11 as builder

WORKDIR /app

# Copy only the necessary directories for Gradle build
COPY gradle gradle
COPY src src
COPY *.gradle ./

# Execute Gradle build
RUN ./gradlew bootJar

# Stage 2: Setup runtime environment
FROM openjdk:11 as runtime

WORKDIR /app

# Copy the output of the Gradle build from the previous stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Mount a volume for temporary data storage
VOLUME /tmp

# Execute the application
ENTRYPOINT [ "java", "-jar", "app.jar" ]