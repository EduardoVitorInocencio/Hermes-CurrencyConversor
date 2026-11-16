import { Button } from '@/shared/components/ui/Button'

export function Pagination({ currentPage, pageSize = 2, totalItems, totalPages, onChange }: { currentPage: number; pageSize?: number; totalItems?: number; totalPages: number; onChange: (page: number) => void }) {
  const pages = Array.from({ length: Math.min(totalPages, 3) }, (_, index) => index + 1)
  return (
    <div className="history-pagination" aria-label="Paginação">
      <span className="history-pagination__count">{totalItems === undefined ? `Página ${currentPage} de ${totalPages}` : `${Math.min((currentPage - 1) * pageSize + 1, totalItems)}–${Math.min(currentPage * pageSize, totalItems)} de ${totalItems} registros`}</span>
      <div className="history-pagination__controls"><span>Por página</span><button className="history-pagination__page-size" type="button">{pageSize}⌄</button><Button disabled={currentPage <= 1} onClick={() => onChange(currentPage - 1)} size="sm" variant="quiet">Anterior</Button>{pages.map((page) => <button aria-current={currentPage === page ? 'page' : undefined} className={currentPage === page ? 'is-current' : undefined} key={page} onClick={() => onChange(page)} type="button">{page}</button>)}{totalPages > 3 ? <span>…</span> : null}{totalPages > 3 ? <button onClick={() => onChange(totalPages)} type="button">{totalPages}</button> : null}<Button disabled={currentPage >= totalPages} onClick={() => onChange(currentPage + 1)} size="sm" variant="quiet">Próxima</Button></div>
    </div>
  )
}
