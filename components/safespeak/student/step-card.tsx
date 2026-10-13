export function StepCard({
  step,
  title,
  hint,
  children,
}: {
  step: number
  title: string
  hint?: string
  children: React.ReactNode
}) {
  const headingId = `step-${step}-title`
  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-4 rounded-3xl border bg-card p-5 shadow-xs md:p-6">
      <div className="flex items-start gap-3">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg font-semibold text-primary-foreground"
          aria-hidden
        >
          {step}
        </span>
        <div className="flex flex-col">
          <h2 id={headingId} className="text-xl font-semibold leading-tight">
            <span className="sr-only">{`Step ${step}: `}</span>
            {title}
          </h2>
          {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  )
}
