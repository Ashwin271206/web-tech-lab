import React from "react";

// Catches render-time errors anywhere below it so the page never goes
// silently blank - it shows a plain message and the error instead.
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Bloggle crashed:", error, info?.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          maxWidth: "34rem", margin: "4rem auto", padding: "1.75rem",
          fontFamily: "system-ui, sans-serif", lineHeight: 1.5,
          border: "1px solid #a62f1d", borderRadius: "8px", background: "#f7e3de", color: "#16211d",
        }}>
          <h1 style={{ fontSize: "1.3rem", margin: "0 0 .5rem" }}>Something went wrong</h1>
          <p style={{ margin: "0 0 1rem" }}>
            The page hit an error and couldn't render. Reloading usually fixes it; if not, check the
            browser console for details.
          </p>
          <pre style={{
            whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: ".85rem",
            background: "#fff", padding: ".75rem", borderRadius: "6px", border: "1px solid #cdd5ce",
          }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1rem", padding: ".6rem 1rem", borderRadius: "6px", border: 0,
              background: "#1d5c45", color: "#fff", fontWeight: 600, cursor: "pointer",
            }}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
