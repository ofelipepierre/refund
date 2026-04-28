<p align="center">
  <img src=".github/preview.jpg" alt="Refund - Solicitação de Reembolso" width="100%" />
</p>

<h1 align="center">💸 Refund</h1>

<p align="center">
  Aplicação web para registro e controle de solicitações de reembolso de despesas corporativas.
</p>

<p align="center">
  <a href="https://ofelipepierre.github.io/refund">Ver projeto online →</a>
</p>

<br />

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- HTML5
- CSS3
- JavaScript

## 💻 Projeto

O **Refund** permite que o usuário registre despesas por categoria, acompanhe o total em tempo real e mantenha as solicitações salvas mesmo após fechar o navegador.

- Cadastro de despesas com nome, categoria e valor
- Categorias: Alimentação, Hospedagem, Serviços, Transporte e Outros
- Formatação automática de valores em Real Brasileiro (BRL)
- Totalização em tempo real
- Remoção individual de itens
- Persistência de dados com `localStorage`
- Layout responsivo para mobile e desktop

## ✨ Funcionalidades adicionadas

O projeto original não incluía persistência de dados nem feedback visual de estado vazio. As seguintes melhorias foram implementadas:

- **Persistência com `localStorage`** — despesas são salvas e recarregadas automaticamente entre sessões; o valor numérico bruto é armazenado separadamente da string formatada, garantindo totais precisos mesmo após recarregar a página
- **Estado vazio visual** — quando não há despesas cadastradas, uma ilustração com mensagem é exibida na lista, ocultada automaticamente ao adicionar o primeiro item
- **Validação de formulário** — campos em branco ou com valor zero exibem um destaque vermelho na borda e retornam o foco ao campo problemático antes de bloquear o envio
- **Animação de remoção** — ao remover um item, ele desliza para a direita com fade-out antes de sair do DOM

## 🔖 Layout

O layout do projeto foi desenvolvido pela equipe da **[Rocketseat](https://rocketseat.com.br)** e está disponível no [Figma](https://www.figma.com).

## 📝 Licença

Esse projeto está sob a licença MIT.

---

Feito com 💜 por **Felipe Pierre** · [linkedin.com/in/ofelipepierre](https://linkedin.com/in/ofelipepierre)
