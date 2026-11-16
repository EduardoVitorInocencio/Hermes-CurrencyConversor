import { Button } from '@/shared/components/ui/Button'

export function Pagination({ currentPage, totalPages, onChange }: { currentPage: number; totalPages: number; onChange: (page: number) => void }) {
  return (
    <div className="history-pagination" aria-label="Paginação">
      <Button disabled={currentPage <= 1} onClick={() => onChange(currentPage - 1)} size="sm" variant="quiet">Anterior</Button>
      <span aria-live="polite">Página {currentPage} de {totalPages}</span>
      <Button disabled={currentPage >= totalPages} onClick={() => onChange(currentPage + 1)} size="sm" variant="quiet">Próxima</Button>
    </div>
  )
}
