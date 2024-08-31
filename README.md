<h1 align="center">🛒 Go Books 📒</h1>

<p align="center">
 <!-- <a href="#demo">Demonstração</a> •  -->
 <a href="#tecnologias">Tecnologias</a> •
 <a href="#rodar">Rodar Localmente</a>
</p>

<p align="center">É um site de leilão de livros! Onde usuários podem vender ou comprar.</p>

<h4 align="center">
  <a href="https://github.com/MatheusAndrade23/Go_Books_FrontEnd">Clique para ver o FrontEnd!</a>
</h4>

---

<!-- <h2 id="demo">Demonstração 🎥</h2>

_<h3>Telas do usuário "Vendedor" + Vendedor criando leilão do livro📚</h3>_
![Tela_do_Vendedor](https://github.com/user-attachments/assets/cc262d91-6e74-482a-aed9-8a125e6e9468)

_<h3>Telas do usuário "Comprador" + Comprador dando Lances🛒</h3>_
![Tela_do_Comprador](https://github.com/user-attachments/assets/d4e2daab-edb7-4cf6-b3be-d3a78fe22b38)

_<h3>"Vendedor" aceitando ou recusando lances ✅</h3>_
![Aceitando_Rejeitando_Lance](https://github.com/user-attachments/assets/9e8a4519-198e-4ed8-94fb-492d9093ceb3)

_<h3>"Comprador" vendo seus lances aceitos ou recusados ✅</h3>_
![Comprador vendo lances](https://github.com/user-attachments/assets/43079180-5100-4699-8550-96508f39bac9)

_<h3>Navegando pelo Prisma Studio e R2 Cloudfare 📁</h3>_
![Navegando_Prisma](https://github.com/user-attachments/assets/eff1a426-f1f3-446a-a328-5752ff92f26c)

_<h3>Documentação dos endpoints com Swagger 🌐</h3>_
![api_docs_NOVO](https://github.com/user-attachments/assets/eb440561-01a5-48b8-b008-a31daf1ea9b8)

<br> -->

---

<h2 id="tecnologias">Tecnologias Utilizadas 🛠</h2>

#### FrontEnd: `NextJS!`

- TypeScript
- Material Ui
- React HookForm
- Zod
- Axios
- React Toastify
- Context API
- React Hooks

#### BackEnd: `NestJS!`

- TypeScript
- Prisma
- Docker
- Bcrypt
- JWT
- Vitest
- Supertest
- Swagger

#### Banco de Dados: `PostgreSQL!`

<br>

---

<h2 id="rodar">Como rodar localmente 🛠</h2>

Pré-requisitos

Antes de começar, verifique se você tem as seguintes ferramentas instaladas em sua máquina:
Docker: Para gerenciar contêineres.
Docker Compose: Para orquestrar múltiplos contêineres.
Node.js: Para executar o código do projeto.
PostgreSQL: Para o banco de dados local (opcional se estiver usando Docker).

<br>

1. Clone o Repositório
<h4>Primeiro, clone o repositório do projeto para sua máquina local. Use o seguinte comando no terminal:</h4>


```bash
git clone https://github.com/MatheusAndrade23/Go_Books_Backend.git
cd Go_Books_Backend
```

<br>

2. Configurar o Arquivo .env
<h4>No diretório do projeto, preencha as variáveis de ambiente no arquivo .env com as informações necessárias:</h4>

```bash
# Prisma Database URL
DATABASE_URL="postgresql://<USUÁRIO>:<SENHA>@localhost:<PORTA>/<NOME_DO_BANCO>"

# JWT Private and Public Key
JWT_PRIVATE_KEY="sua_chave_privada"
JWT_PUBLIC_KEY="sua_chave_publica"

# Cloudflare Account ID
CLOUDFLARE_ACCOUNT_ID="seu_id_da_conta"

# AWS S3 Storage of Cloudfare
AWS_BUCKET_NAME="seu_nome_do_bucket"
AWS_ACCESS_KEY_ID="seu_access_key_id"
AWS_SECRET_ACCESS_KEY="sua_secret_access_key"
```

<br>

<h4>3. Instalar PostgreSQL (opcional se estiver usando Docker)</h4>

Se você não estiver usando Docker, instale o PostgreSQL em sua máquina. As etapas de instalação variam de acordo com o seu sistema operacional. Você pode seguir as instruções oficiais do PostgreSQL para sua plataforma:

- Windows: https://www.postgresql.org/download/windows/
- macOS: https://www.postgresql.org/download/macosx/
- Linux: https://www.postgresql.org/download/linux/

<br>

<h4>4. Iniciar os Contêineres</h4>
No terminal, execute o seguinte comando para iniciar os serviços definidos no docker-compose.yml:

```bash
docker-compose up -d
```

<h4>Esse comando fará o download da imagem necessária e iniciará os contêineres.</h4>

<br>

<h4>5. Instalar Dependências do Projeto</h4>
Após iniciar os contêineres, instale as dependências do projeto. Execute:

```bash
npm install
```
<br>

<h4>6. Executar as Migrações do Prisma</h4>
Para configurar o banco de dados, execute as migrações do Prisma:

```bash
npx prisma migrate deploy
```

<h4>7. Iniciar a Aplicação</h4>
Para iniciar a aplicação, digite no terminal:

```bash
npm run start
```

<h4>8. Acessar a Aplicação</h4>
   
A aplicação deve estar rodando em http://localhost:3333. Acesse http://localhost:3333/docs para ver a documentação.
