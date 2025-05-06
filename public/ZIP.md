
# Como empacotar a extensão PageBrief para distribuição

Para distribuir a extensão PageBrief para seus usuários, siga estas etapas:

## 1. Construa o projeto

Certifique-se de que todas as dependências estão instaladas:

```bash
npm install
```

Em seguida, construa o projeto:

```bash
npm run build
```

## 2. Prepare os arquivos para empacotamento

Os arquivos necessários para a extensão estão na pasta `dist`. Você precisa criar um arquivo ZIP contendo esta pasta.

### No Windows:
1. Navegue até a pasta `dist`
2. Selecione todos os arquivos na pasta
3. Clique com o botão direito e selecione "Enviar para" > "Pasta compactada"

### No MacOS:
1. Navegue até a pasta `dist`
2. Selecione todos os arquivos na pasta
3. Clique com o botão direito e selecione "Comprimir itens"

### No Linux:
```bash
cd dist
zip -r ../pagebrief.zip *
```

## 3. Publique na Chrome Web Store

1. Acesse a [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Faça login com sua conta do Google
3. Clique em "Adicionar novo item"
4. Carregue o arquivo ZIP criado anteriormente
5. Preencha as informações necessárias:
   - Nome: PageBrief
   - Descrição: Resumos inteligentes para qualquer página web
   - Categoria: Produtividade
   - Idiomas: Português (Brasil)
   - Screenshot e Ícones: Adicione capturas de tela e ícones para sua extensão
   - Preço: Gratuito
6. Envie para revisão

## 4. Aguarde aprovação

O processo de revisão da Google pode levar de algumas horas a alguns dias.
Uma vez aprovada, sua extensão será publicada na Chrome Web Store e estará disponível para download.

## 5. Compartilhe com seus usuários

Após a aprovação, você receberá um link permanente para sua extensão. Compartilhe este link com seus usuários para que eles possam instalar a extensão facilmente.
