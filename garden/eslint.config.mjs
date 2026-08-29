import next from 'eslint-config-next/core-web-vitals'

// oxlint continua como o linter rápido do dia a dia (npm run lint).
// O ESLint aqui adiciona as regras do Next (uso de <Image>/<Link>, <a> para
// rota interna, etc.) e as regras de fronteira de arquitetura.
//
// Fronteira de dependência (migração para src/features + src/shared):
//   app → features → shared        (só nesse sentido)
//   shared não conhece domínio; features não importam app nem outra feature
//   por caminho fundo — só pela API pública (@features/<nome>).
//
// Duas camadas de defesa:
//  - import/no-restricted-paths pega imports relativos (../../app/...);
//  - no-restricted-imports pega os aliases (@app, @features, @/…), que o
//    resolver nem sempre consegue mapear.

const boundaries = {
  files: ['src/**/*.{js,jsx}'],
  settings: {
    // o projeto usa jsconfig.json, não tsconfig.json
    'import/resolver': {
      typescript: { alwaysTryTypes: true, project: './jsconfig.json' },
      node: { extensions: ['.js', '.jsx'] },
    },
  },
  rules: {
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './src/shared',
            from: ['./src/features', './src/app'],
            message:
              'shared/ é transversal: não pode importar de features/ nem de app/.',
          },
          {
            target: './src/features',
            from: './src/app',
            message:
              'features/ não pode importar de app/ (a dependência é app → features).',
          },
        ],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@features/*/*', '@/features/*/*'],
            message:
              'Importe features apenas pela API pública: @features/<nome>, nunca por caminho interno.',
          },
        ],
      },
    ],
  },
}

const sharedLayer = {
  files: ['src/shared/**/*.{js,jsx}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@app/*', '@/app/*', '@features/*', '@/features/*'],
            message: 'shared/ é transversal: não importe de app/ nem de features/.',
          },
        ],
      },
    ],
  },
}

const featuresLayer = {
  files: ['src/features/**/*.{js,jsx}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@app/*', '@/app/*'],
            message: 'features/ não importa app/ (a dependência é app → features).',
          },
          {
            group: ['@features/*/*', '@/features/*/*'],
            message:
              'Uma feature não importa caminho interno de outra — só a API pública @features/<nome>.',
          },
        ],
      },
    ],
  },
}

const config = [
  { ignores: ['.next/**', 'out/**', 'node_modules/**'] },
  ...next,
  boundaries,
  sharedLayer,
  featuresLayer,
]

export default config
