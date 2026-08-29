import Link from 'next/link'
import { PageShell, PageHead } from '@shared/ui'

export default function NotFound() {
  return (
    <PageShell>
      <PageHead eyebrow="404">Essa página não existe.</PageHead>
      <Link
        href="/"
        className="inline-block border border-fg px-4 py-3 text-xs uppercase tracking-widest no-underline transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
      >
        Voltar ao início
      </Link>
    </PageShell>
  )
}
