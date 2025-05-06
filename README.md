
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b47f9b37-53e4-4f58-bd1f-2418df6dec96

## Extensão PageBrief - Chrome

Esta é uma extensão para o Google Chrome que gera resumos inteligentes de páginas web.

### Construindo a extensão

```sh
# Ensure you have all dependencies
npm install

# Build the project using Vite
npm run build

# The extension will be available in the dist folder
```

### Testando localmente

Para testar a extensão localmente:
1. Construa o projeto usando os comandos acima
2. Abra o Chrome e navegue para `chrome://extensions/`
3. Ative o "Modo do desenvolvedor" (interruptor no canto superior direito)
4. Clique em "Carregar sem compactação"
5. Selecione a pasta `dist` gerada pelo processo de build

### Publicando na Chrome Web Store

Para publicar a extensão na Chrome Web Store, siga as instruções em [ZIP.md](public/ZIP.md).

### Uso da Extensão

Após instalar a extensão:
1. Navegue para qualquer página web
2. Clique no ícone da extensão na barra de ferramentas
3. Clique em "Resumir página" para gerar um resumo da página atual

## Como editar este projeto?

Existem várias maneiras de editar o código:

**Use Lovable**

Simplesmente visite o [Lovable Project](https://lovable.dev/projects/b47f9b37-53e4-4f58-bd1f-2418df6dec96) e comece a fazer solicitações.

As alterações feitas via Lovable serão confirmadas automaticamente neste repositório.

**Use seu IDE preferido**

Se você quiser trabalhar localmente usando seu próprio IDE, você pode clonar este repositório e enviar alterações. As alterações enviadas também serão refletidas no Lovable.

O único requisito é ter Node.js e npm instalados - [instale com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Siga estes passos:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**To build the Chrome extension:**

```sh
# Ensure you have all dependencies
npm i

# Build the project using npx to access local node modules
npx vite build

# The extension will be available in the dist folder
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b47f9b37-53e4-4f58-bd1f-2418df6dec96) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
