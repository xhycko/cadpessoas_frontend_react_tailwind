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

### Vercel
1. Conectar repositório
2. Framework: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

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
- Code splitting
- Tree shaking
- Minificação HTML/CSS/JS
- Compressão gzip/brotli

### Performance
- Lazy loading
- Bundle analysis
- Chunks estratégicos
- CSS code splitting

### Cache
- Assets estáticos: 1 ano
- HTML: 1 hora

### Security Headers
- X-Frame-Options: DENY
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy

## Métricas

### Bundle Size (Gzipped)
- Total: < 500KB
- React: ~130KB
- Router: ~25KB
- Tailwind: ~20KB
- App: ~50KB

### Lighthouse Target
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+

## Configuração API

### Variáveis
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

## Checklist
- [ ] Build sem erros
- [ ] Bundle < 500KB
- [ ] Lighthouse > 90
- [ ] CORS configurado
- [ ] Headers segurança
- [ ] Cache configurado