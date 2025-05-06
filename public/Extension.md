
# Como transformar este projeto em uma extensão do Google Chrome

Para usar esta aplicação como uma extensão do Chrome, siga os passos abaixo:

## 1. Construa o projeto

Execute o comando de build para criar os arquivos da extensão:

```bash
# Usando npx para acessar os módulos locais do node
npx vite build
```

## 2. Carregue a extensão no Chrome

1. Abra o Google Chrome
2. Navegue para `chrome://extensions/`
3. Ative o "Modo do desenvolvedor" (interruptor no canto superior direito)
4. Clique em "Carregar sem compactação"
5. Selecione a pasta `dist` gerada pelo processo de build

## 3. Use a extensão

Após carregar a extensão:
1. Você verá o ícone do PageBrief na barra de ferramentas
2. Clique no ícone para abrir o popup em qualquer página
3. Clique em "Resumir página" para gerar um resumo da página atual

## 4. Configurações

Acesse as configurações:
1. Clique com o botão direito no ícone da extensão
2. Selecione "Opções"

## 5. Login (Simulado)

O login é simulado nesta versão demo:
- Use o botão "Entrar" para simular um login
- Você pode verificar as diferenças entre o plano gratuito e o premium
