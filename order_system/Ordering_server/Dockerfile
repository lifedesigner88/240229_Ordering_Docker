FROM openjdk:11 as stage1

WORKDIR /app

# gradle 빌드시에 필요한 파일들을 workdir로 copy
# /app/gradlew 파일, gradle 폴더, build.gradle 파일 등등
COPY . .
#
#COPY gradlew .
#COPY gradle gradle
#COPY build.gradle .
#COPY settings.gradle .
#COPY src src

# /app/build/libs/*.jar 파일 아래 명령어를 통해서 생성
RUN ./gradlew bootJar

FROM openjdk:11

WORKDIR /app

COPY --from=stage1 /app/build/libs/*.jar app.jar

# CMD 또는 ENTRYPOINT를 통해서 컨테이너를 실행
ENTRYPOINT [ "java", "-jar", "app.jar" ]