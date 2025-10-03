# Deploy - CRUD de Pessoas

## Build

```bash
npm ci
npm run build
npm run build:analyze  # opcional
```

## Deploy Automático

### Netlify
1. Conectar repositório
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Configurações via `netlify.toml`

### Vercel
1. Conectar repositório
2. Framework: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Configurações via `vercel.json`

## Deploy Manual

```bash
# Netlify
npm install -g netlify-cli
npm run deploy:netlify

# Vercel
npm install -g vercel
npm run deploy:vercel
```

## Otimizações

### Build
- Tailwind CSS purge
- Code splitting por funcionalidade
- Tree shaking
- Minificação HTML/CSS/JS
- Compressão gzip/brotli
- Cache busting com hash
- Source maps

### Performance
- Lazy loading de páginas
- Bundle analysis
- Chunks estratégicos
- CSS code splitting
- Target ES2015+

### Cache
- Assets estáticos: 1 ano
- HTML: 1 hora
- Service worker: sem cache

### Security Headers
- X-Frame-Options: DENY
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

## Métricas

### Bundle Size (Gzipped)
- Total: < 500KB
- React: ~130KB
- Router: ~25KB
- Icons: ~15KB
- App: ~50KB

### Lighthouse Target
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 85+

## Configuração API

### Variáveis
`.env.production`:
```env
VITE_API_URL=https://sua-api.herokuapp.com/api
```

### CORS
```javascript
app.use(cors({
  origin: ['https://seu-app.netlify.app'],
  credentials: true
}));
```

## Docker

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Troubleshooting

### Build Falha
1. `npm run clean`
2. `npm ci`
3. Verificar Node.js 18+

### Bundle Grande
1. `npm run build:analyze`
2. Verificar imports
3. Lazy load componentes

### Performance
1. Lighthouse audit
2. Otimizar imagens
3. Revisar chunks

## Checklist

- [ ] Build sem erros
- [ ] Bundle < 500KB
- [ ] Lighthouse > 90
- [ ] CORS configurado
- [ ] Variáveis definidas
- [ ] Headers segurança
- [ ] Cache configurado
- [ ] Compressão ativa