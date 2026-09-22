# Estágio 1: Build da aplicação Java Spring Boot com Maven
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Copia arquivos do Maven Wrapper e dependências
COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copia o código-fonte e gera o pacote .jar sem executar testes
COPY src src
RUN ./mvnw clean package -DskipTests

# Estágio 2: Imagem leve de execução (JRE 21 Alpine)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copia o .jar compilado do estágio anterior
COPY --from=builder /app/target/*.jar app.jar

# Porta padrão do Spring Boot
EXPOSE 8080

# Inicializa o backend
ENTRYPOINT ["java", "-jar", "app.jar"]
