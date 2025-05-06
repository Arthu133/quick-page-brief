
# Guia de Publicação na Chrome Web Store

Este guia fornece instruções detalhadas sobre como publicar a extensão PageBrief na Chrome Web Store.

## Pré-requisitos

1. Conta de desenvolvedor da Chrome Web Store (taxa única de $5 USD)
2. Build completo da extensão (pasta `dist`)
3. Recursos gráficos (ícones, screenshots, imagens promocionais)

## Preparação de recursos gráficos

### Ícones necessários
- Ícone da extensão: 128x128 pixels (PNG)
- Ícone na loja: 128x128 pixels (PNG)
- Ícone promocional pequeno: 440x280 pixels (PNG)
- Banner promocional grande: 920x680 pixels (PNG)

### Screenshots
Prepare de 3 a 5 screenshots da sua extensão em uso, com resolução de 1280x800 pixels.

## Criando uma conta de desenvolvedor

1. Visite a [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Faça login com sua conta Google
3. Aceite os termos e pague a taxa única de registro ($5 USD)

## Preparando a submissão

1. No Developer Dashboard, clique em "Novo item"
2. Carregue o arquivo ZIP da sua extensão (pasta `dist` compactada)
3. Preencha as informações de listagem:

### Informações do produto
- **Nome da extensão**: PageBrief
- **Descrição resumida**: Resumos inteligentes para qualquer página web
- **Descrição detalhada**: PageBrief transforma qualquer conteúdo em resumos concisos. Com um simples clique, obtenha os pontos principais de artigos, blogs e páginas web sem perder tempo lendo todo o conteúdo. Ideal para pesquisas, estudos e manter-se informado em menos tempo.
- **Idiomas**: Português (Brasil)
- **Categoria**: Produtividade
- **Site da extensão**: https://quick-page-brief.lovable.app

### Recursos gráficos
- Carregue os ícones e screenshots preparados anteriormente

### Itens adicionais
- **Política de privacidade**: URL para sua política de privacidade (obrigatório se coletar dados)
- **Opções de visibilidade**: Pública (visível para todos) ou Privada (apenas com link direto)
- **Países e regiões**: Selecione onde sua extensão estará disponível

## Enviando para revisão

1. Revise todas as informações fornecidas
2. Clique em "Enviar para revisão"
3. Aguarde o processo de revisão (pode levar até 3 dias úteis)

## Após a aprovação

Depois que sua extensão for aprovada:
1. Você receberá um e-mail de confirmação
2. Sua extensão aparecerá na Chrome Web Store
3. Você pode compartilhar o link direto com seus usuários

## Atualizando sua extensão

Para atualizar a extensão:
1. Faça as alterações necessárias no código
2. Aumente o número da versão no arquivo `manifest.json`
3. Construa o projeto novamente
4. No Developer Dashboard, selecione sua extensão
5. Clique em "Enviar atualização"
6. Carregue o novo arquivo ZIP
7. Envie para revisão

## Dicas para aprovação mais rápida

- Forneça descrições claras e precisas
- Garanta que todas as funcionalidades mencionadas estejam realmente funcionando
- Tenha uma política de privacidade clara mesmo que não colete dados
- Siga estritamente as [políticas do desenvolvedor](https://developer.chrome.com/docs/webstore/program_policies/)
