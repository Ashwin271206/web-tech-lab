// Small presentational pieces for loading, error, empty and notice states.

export function Loading({ label = "Loading", rows = 3 }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="visually-hidden">{label}…</span>
      {Array.from({ length: rows }).map((_, i) => (
        <div className="skeleton-row" key={i} aria-hidden="true">
          <div className="skeleton skeleton-date" />
          <div className="skeleton-body">
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line short" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorState({ title = "Couldn't load this page", message, onRetry }) {
  return (
    <div className="state state-error" role="alert">
      <h2>{title}</h2>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-secondary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title, children, action }) {
  return (
    <div className="state">
      <h2>{title}</h2>
      {children && <p>{children}</p>}
      {action}
    </div>
  );
}

// type: "success" | "error"
export function Alert({ type = "success", children, onDismiss }) {
  return (
    <div className={`alert alert-${type}`} role={type === "error" ? "alert" : "status"}>
      <span>{children}</span>
      {onDismiss && (
        <button type="button" className="alert-close" onClick={onDismiss} aria-label="Dismiss message">
          ×
        </button>
      )}
    </div>
  );
}
