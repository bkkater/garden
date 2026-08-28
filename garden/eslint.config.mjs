import next from 'eslint-config-next/core-web-vitals'

// oxlint continua como o linter rápido do dia a dia (npm run lint).
// O ESLint aqui só adiciona as regras específicas do Next
// (uso de <Image>/<Link>, <a> para rota interna, etc.).
const config = [{ ignores: ['.next/**', 'out/**', 'node_modules/**'] }, ...next]

export default config
