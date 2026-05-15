# CRM Imobiliário — Deploy & Instruções

Este repositório contém um site público (`index.html`) e o CRM privado (`admin.html`) usando apenas HTML/CSS/JS e `localStorage`.

Alterar senha do admin
- Abra `[script.js](script.js)` e altere a constante `ADMIN_PASSWORD` para uma senha segura.

Servir localmente (recomendado para testes)
```bash
cd "/Users/isaacomar/Desktop/crm imobiliário"
# Servir com Python 3 (porta 8000)
python3 -m http.server 8000
# Depois abra no navegador:
# http://localhost:8000/index.html
# http://localhost:8000/admin.html
```

Publicar no GitHub Pages (automático via Actions)
1. Crie um novo repositório no GitHub e conecte-o localmente:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<SEU_USUARIO>/<SEU_REPO>.git
git push -u origin main
```
2. O workflow em `.github/workflows/deploy.yml` irá executar quando você enviar para `main` e publicar os arquivos na branch `gh-pages` automaticamente. O site ficará disponível em: `https://<SEU_USUARIO>.github.io/<SEU_REPO>/` (aguarde alguns minutos na primeira execução).

Deploy no Vercel
- Vá em https://vercel.com, clique em "New Project" → importe do GitHub → selecione o repositório → Deploy. Vercel detecta site estático automaticamente.

Deploy no Netlify
- Vá em https://app.netlify.com/sites/new → import from Git → selecione o repositório → Deploy; ou arraste a pasta `dist`/pasta do projeto para o painel (site estático).

Observações
- O deploy automático por Actions usa o token `GITHUB_TOKEN` interno, nenhuma configuração extra é necessária após pushar o repositório.
- Caso queira usar domínios personalizados, configure no provedor de DNS e adicione `CNAME` no branch `gh-pages` (ou nas configurações do Netlify/Vercel).
