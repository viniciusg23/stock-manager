<div align="center" width="100%">
    <img src="./client/public/logo128.png" width="128" alt="" />
</div>

# IStock
IStock é uma ferramenta fácil de utilizar para gerenciamento de estoque.

![Tela de cadastro de usuário](./docs/images/image1.png)
![Tela de Estoque de Produtos](./docs/images/image2.png)

## 📲 Funcionalidades
- Controle de produtos em estoque.
- Registro de vendas.
- Geração de etiquetas para produtos.
- Vendas agéis utilizando o QR Code da Etiqueta em dispositivos móveis.
- Controle de categorias.
- Controle de funcionários.
- Controle de fornecedores.
- Controle de viagens para reabastecimento de estoque.
- Dashboard com diversos dados.

## 🧰 Tecnologias
![Tecnologias utilizadas](https://skillicons.dev/icons?i=ts,nodejs,express,mongodb,react,redux,materialui,git)

## 🔧 Como Instalar
**Requisitos:**
- Node.js 18 ou superior
- npm 9 ou superior
- Git


```bash
# Atualize seu npm
npm install npm@9 -g

git clone https://github.com/viniciusg23/stock-manager.git
cd stock-manager
```

**Configuração do Ambiente:**
Utilizando algum editor, crie um novo arquivo na raiz do diretório `stock-manager` chamado `.env` e nele adicione.
```bash
#URI do MongoDB (Faça as mudanças necessárias)
MONGODB_URI=mongodb+srv://user:password@maincluster.hqzp4yx.mongodb.net/database_name?retryWrites=true&w=majority

#Segredo do Json Web Token
JWT_SECRET=your-secret


#Senha do sistema para algumas operações específicas
SYSTEM_CONTROL_PASSWORD=your-system-password


#Ambiente (por padrão é development)
ENVIROMENT=development
```

### 🧪 Desenvolvimento

Para executar o sistema em desenvolvimento:

```bash
# Instalação do node_modules
npm run setup

# Execução do ambiente de desenvolvimento
npm run dev
```

Agora IStock está rodando em [http://localhost:3001/](http://localhost:3001/)

### 🚀 Produção

Edite o arquivo `.env`.

```bash
ENVIROMENT=production
``` 

Para executar o sistema em produção:

```bash
# Windows
npm run win-prod

# Linux
npm run prod
```

Outros comandos úteis do pm2:
```bash
# listar todos os serviços em execução
npx pm2 list

# reinicia o serviço
npx pm2 restart app_name

# encerra o serviço
npx pm2 stop app_name

# apaga o serviço
npx pm2 delete app_name
```

## 📄 Informações da API
Pode acessar uma documentação extensa da API em:

[Documentação API](./docs/api/API_Documentation.md)

Assim como pode obter um arquivo para visualizar e editar o collection da API.

## 💻 Informações Sobre o Sistema

Gerenciamento de Produtos:
![Tela de Produtos](./docs/images/image3.png)
![Tela de Produtos tema escuro](./docs/images/image4.png)
![Criação de um novo Produto](./docs/images/manage_products.gif)

Gerenciamento de Estoque:
![Gerenciamento do Estoque](./docs/images/manage_stock.gif)

Gerenciamento de Funcionários:
![Gerenciamento de Funcionários](./docs/images/manage_employees.gif)

Vendas:
![Registro de uma venda](./docs/images/sales.gif)

Validação de uma viagem para reabastecimento de Estoque:
![Controle de Viagem](./docs/images/travel_control.gif)

Dashboard:
![Dashboard com dados do estoque](./docs/images/dashboard.gif)