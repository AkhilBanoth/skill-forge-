import { useEffect, useMemo, useState, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, LoaderCircle, Search, X } from 'lucide-react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; loading?: boolean; icon?: ReactNode; size?: 'sm' | 'md' | 'lg' }

export function Button({ variant = 'primary', loading = false, icon, size = 'md', className = '', children, disabled, ...props }: ButtonProps) {
  return <button className={`ui-button ui-button-${variant} ui-button-${size} ${className}`} disabled={disabled || loading} {...props}>
    {loading ? <LoaderCircle size={16} className="spin" /> : icon}{children}
  </button>
}

export function Input({ label, hint, error, className = '', id, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string; error?: string }) {
  const inputId = id ?? props.name ?? label?.toLowerCase().replace(/\s+/g, '-')
  return <label className={`field ${className}`} htmlFor={inputId}>{label && <span className="field-label">{label}</span>}<input id={inputId} className={`control ${error ? 'control-error' : ''}`} aria-invalid={!!error} aria-describedby={error || hint ? `${inputId}-help` : undefined} {...props} />{(error || hint) && <span id={`${inputId}-help`} className={`field-hint ${error ? 'field-error' : ''}`}>{error || hint}</span>}</label>
}

export function Select({ label, error, children, className = '', id, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }) {
  const selectId = id ?? props.name ?? label?.toLowerCase().replace(/\s+/g, '-')
  return <label className={`field ${className}`} htmlFor={selectId}>{label && <span className="field-label">{label}</span>}<span className="select-wrap"><select id={selectId} className={`control ${error ? 'control-error' : ''}`} aria-invalid={!!error} {...props}>{children}</select><ChevronDown size={16} /></span>{error && <span className="field-hint field-error">{error}</span>}</label>
}

export function Textarea({ label, hint, error, className = '', id, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string; error?: string }) {
  const inputId = id ?? props.name ?? label?.toLowerCase().replace(/\s+/g, '-')
  return <label className={`field ${className}`} htmlFor={inputId}>{label && <span className="field-label">{label}</span>}<textarea id={inputId} className={`control textarea ${error ? 'control-error' : ''}`} aria-invalid={!!error} {...props} />{(error || hint) && <span className={`field-hint ${error ? 'field-error' : ''}`}>{error || hint}</span>}</label>
}

export function Card({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`ui-card ${className}`} {...props}>{children}</div>
}

export function Badge({ children, tone = 'neutral', className = '' }: { children: ReactNode; tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'violet'; className?: string }) {
  return <span className={`badge badge-${tone} ${className}`}>{children}</span>
}

export function Progress({ value, color = 'primary', label, className = '' }: { value: number; color?: 'primary' | 'success' | 'amber' | 'violet'; label?: string; className?: string }) {
  const percent = Math.max(0, Math.min(100, value))
  return <div className={`progress-wrap ${className}`} aria-label={label ?? `${percent}% complete`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><div className={`progress-fill progress-${color}`} style={{ width: `${percent}%` }} /></div>
}

export function Ring({ value, size = 112, stroke = 9, color = 'primary', label, sublabel }: { value: number; size?: number; stroke?: number; color?: 'primary' | 'success' | 'amber' | 'violet'; label?: string; sublabel?: string }) {
  const percent = Math.max(0, Math.min(100, value)); const radius = (size - stroke) / 2; const circumference = radius * 2 * Math.PI
  return <div className="ring-wrap" style={{ width: size, height: size }} role="img" aria-label={`${label ?? 'Progress'}: ${percent}%`}><svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="ring-svg"><circle className="ring-track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} /><circle className={`ring-value ring-${color}`} cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} strokeDasharray={circumference} strokeDashoffset={circumference * (1 - percent / 100)} /></svg><span className="ring-center"><strong>{label ?? `${percent}%`}</strong>{sublabel && <small>{sublabel}</small>}</span></div>
}

export function StatCard({ label, value, change, icon, tone = 'primary' }: { label: string; value: string; change?: string; icon: ReactNode; tone?: 'primary' | 'amber' | 'green' | 'violet' }) {
  return <Card className="stat-card"><div className={`stat-icon stat-${tone}`}>{icon}</div><div className="stat-copy"><span>{label}</span><strong>{value}</strong>{change && <small>{change}</small>}</div></Card>
}

export function EmptyState({ icon, title, description, action }: { icon?: ReactNode; title: string; description: string; action?: ReactNode }) {
  return <div className="empty-state"><div className="empty-icon">{icon}</div><h3>{title}</h3><p>{description}</p>{action}</div>
}

export function Skeleton({ className = '' }: { className?: string }) { return <div className={`skeleton ${className}`} aria-hidden="true" /> }

export function Avatar({ name, src, size = 'md', className = '' }: { name: string; src?: string; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const initials = name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()
  return <span className={`avatar avatar-${size} ${className}`}>{src ? <img src={src} alt={name} /> : initials}</span>
}

export function Modal({ open, onClose, title, children, size = 'md' }: { open: boolean; onClose: () => void; title: string; children: ReactNode; size?: 'sm' | 'md' | 'lg' }) {
  useEffect(() => { if (!open) return; const close = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [open, onClose])
  if (!open) return null
  return <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className={`dialog dialog-${size}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title"><header><h2 id="dialog-title">{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={18} /></button></header><div className="dialog-content">{children}</div></section></div>
}

export function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null
  return <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><aside className="drawer" role="dialog" aria-modal="true" aria-label={title}><header><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close drawer"><X size={18} /></button></header>{children}</aside></div>
}

export function Tabs({ tabs, initial = 0 }: { tabs: { label: string; content: ReactNode }[]; initial?: number }) {
  const [active, setActive] = useState(initial)
  return <div><div className="tabs" role="tablist">{tabs.map((tab, index) => <button key={tab.label} role="tab" aria-selected={active === index} className={active === index ? 'tab active' : 'tab'} onClick={() => setActive(index)}>{tab.label}</button>)}</div><div role="tabpanel" className="tab-panel">{tabs[active]?.content}</div></div>
}

type Column<T> = { key: keyof T; label: string; render?: (row: T) => ReactNode; sortable?: boolean }
export function DataTable<T extends Record<string, unknown>>({ rows, columns, pageSize = 5 }: { rows: T[]; columns: Column<T>[]; pageSize?: number }) {
  const [query, setQuery] = useState(''); const [sortKey, setSortKey] = useState<keyof T | null>(null); const [descending, setDescending] = useState(false); const [page, setPage] = useState(0)
  const filtered = useMemo(() => rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(query.toLowerCase()))).sort((a, b) => { if (!sortKey) return 0; return String(a[sortKey]).localeCompare(String(b[sortKey])) * (descending ? -1 : 1) }), [rows, query, sortKey, descending])
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize)); const visible = filtered.slice(page * pageSize, (page + 1) * pageSize)
  return <div className="table-wrap"><label className="table-search"><Search size={15} /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(0) }} placeholder="Search records" aria-label="Search table" /></label><div className="table-scroll"><table><thead><tr>{columns.map((column) => <th key={String(column.key)}><button className="sort-button" onClick={() => { if (column.sortable !== false) { setSortKey(column.key); setDescending((value) => !value) } }}>{column.label}{sortKey === column.key && (descending ? <ChevronDown size={13} /> : <ChevronUp size={13} />)}</button></th>)}</tr></thead><tbody>{visible.map((row, index) => <tr key={index}>{columns.map((column) => <td key={String(column.key)}>{column.render ? column.render(row) : String(row[column.key] ?? '')}</td>)}</tr>)}</tbody></table></div><footer className="table-footer"><span>{filtered.length ? `${page * pageSize + 1}-${Math.min((page + 1) * pageSize, filtered.length)} of ${filtered.length}` : 'No results'}</span><div><button className="icon-button" aria-label="Previous page" disabled={page === 0} onClick={() => setPage((value) => Math.max(0, value - 1))}><ChevronLeft size={16} /></button><button className="icon-button" aria-label="Next page" disabled={page >= pages - 1} onClick={() => setPage((value) => Math.min(pages - 1, value + 1))}><ChevronRight size={16} /></button></div></footer></div>
}

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return <ol className="stepper">{steps.map((step, index) => <li key={step} className={index < current ? 'step complete' : index === current ? 'step current' : 'step'}><span>{index < current ? <Check size={13} /> : index + 1}</span><small>{step}</small></li>)}</ol>
}

export function Timeline({ items }: { items: { title: string; description: string; date?: string; complete?: boolean }[] }) {
  return <ol className="timeline">{items.map((item) => <li key={item.title} className={item.complete ? 'timeline-item complete' : 'timeline-item'}><span className="timeline-dot">{item.complete && <Check size={12} />}</span><div><div className="timeline-heading"><strong>{item.title}</strong>{item.date && <small>{item.date}</small>}</div><p>{item.description}</p></div></li>)}</ol>
}

export function SkillMeter({ value, label, level }: { value: number; label?: string; level?: string }) {
  return <div className="skill-meter">{(label || level) && <div className="skill-meter-heading">{label && <span>{label}</span>}{level && <small>{level}</small>}</div>}<Progress value={value} color={value >= 75 ? 'success' : value >= 45 ? 'primary' : 'amber'} /></div>
}

export function Tooltip({ text, children }: { text: string; children: ReactNode }) { return <span className="tooltip" title={text}>{children}</span> }

export function Dropdown({ label, items }: { label: ReactNode; items: { label: string; onClick: () => void; danger?: boolean }[] }) {
  const [open, setOpen] = useState(false)
  return <div className="dropdown"><button className="dropdown-trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open}>{label}<ChevronDown size={14} /></button>{open && <div className="dropdown-menu" role="menu">{items.map((item) => <button key={item.label} role="menuitem" className={item.danger ? 'dropdown-danger' : ''} onClick={() => { item.onClick(); setOpen(false) }}>{item.label}</button>)}</div>}</div>
}
