# 💳 E-Pay Fintech - Internet Banking & Carteira Digital

> Projeto Full-Stack corporativo desenvolvido para demonstrar proficiência em **Java com Spring Boot**, **Oracle SQL / H2 Database** e **React com Vite e Tailwind CSS**.

---

## 🏛️ Estrutura do Projeto

```
epay-fintech/
├── backend/                       # API REST Java com Spring Boot 3.4
│   ├── src/main/java/             # Arquitetura em camadas (Controller, Service, Repository, Model, DTO)
│   ├── src/main/resources/        # application.properties (H2 local) e application-oracle.properties (FIAP)
│   ├── schema-oracle.sql          # Script DDL com Sequences e Tabelas para Oracle SQL
│   ├── pom.xml                    # Maven com Spring Data JPA, Oracle JDBC, Security, JWT, Swagger
│   └── mvnw.cmd                   # Maven Wrapper
│
└── frontend/                      # Single Page Application React 18
    ├── src/
    │   ├── components/            # Navbar, Sidebar, CardVirtual, ModalDeposito
    │   ├── pages/                 # LandingPage, Login, Cadastro, Dashboard, Extrato, Pix, Cartoes, Investimentos
    │   ├── context/               # AuthContext com gerenciamento reativo de saldo e JWT
    │   └── services/              # Cliente Axios com interceptors de token
    ├── package.json
    └── vite.config.js             # Proxy reverso para http://localhost:8080
```

---

## 🚀 Como Executar o Projeto

### 1. Executando o Backend (Spring Boot)
No terminal, entre na pasta `backend`:
```powershell
cd C:\Users\crisf\OneDrive\Documents\Projetos\epay-fintech\backend
.\mvnw.cmd spring-boot:run
```
- A API iniciará na porta **8080**.
- **Documentação Swagger**: Acesse [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) para testar os endpoints interativamente.
- **Console H2 (Banco em memória)**: Acesse [http://localhost:8080/h2-console](http://localhost:8080/h2-console) (JDBC URL: `jdbc:h2:mem:epaydb`, Usuário: `sa`, Senha: em branco).

> **Para rodar no Oracle da FIAP**:
> Basta alterar no arquivo `application.properties`:
> `spring.profiles.active=oracle` e definir sua senha em `FIAP_ORACLE_PASSWORD`.

---

### 2. Executando o Frontend (React)
Em outro terminal, entre na pasta `frontend`:
```powershell
cd C:\Users\crisf\OneDrive\Documents\Projetos\epay-fintech\frontend
npm.cmd run dev
```
- O frontend iniciará em [http://localhost:5173](http://localhost:5173).

---

## 🔑 Credenciais Pré-configuradas para Testes (Seed)

O backend já inicializa automaticamente duas contas para você testar transferências Pix em tempo real:

| Titular | E-mail | Senha | Saldo Inicial | Chave Pix |
|---|---|---|---|---|
| **Douglas Cristian** | `douglas@epay.com.br` | `123456` | R$ 5.420,50 | `douglas@epay.com.br` |
| **Maria Silva** | `maria@epay.com.br` | `123456` | R$ 2.500,00 | `maria@epay.com.br` |

*(Na tela de Login existem botões de 1 clique para preenchimento instantâneo)*.

---

## 💼 Funcionalidades de Destaque para Apresentação
1. **Transferências Pix Atômicas**: Garantia ACID via `@Transactional` com validação de saldo e rollback automático em falhas.
2. **Autenticação Stateless JWT**: Segurança de ponta a ponta com senhas criptografadas em BCrypt.
3. **Cartões Virtuais**: Emissão automática, trava de bloqueio/desbloqueio e slider dinâmico de ajuste de limite.
4. **Simulador de Investimentos**: Cálculo de juros compostos com precisão financeira (`BigDecimal`) comparando Poupança vs CDI 100% vs Criptomoedas.
5. **Depósito Instantâneo**: Modal de depósito simulado para recarregar saldo durante testes e apresentações.
