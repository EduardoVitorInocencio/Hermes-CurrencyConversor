export function RecordCount({ count }: { count: number }) {
  return <p className="history-record-count" aria-live="polite">{count} {count === 1 ? 'registro' : 'registros'}</p>
}
