import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import PostSummary from "../components/PostSummary.jsx";
import { Alert, EmptyState, ErrorState, Loading } from "../components/StatusMessage.jsx";
import { errorMessage, formatDate, parseResponse } from "../utils.js";

export default function Archive() {
  const location = useLocation();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [flash, setFlash] = useState({ type: "success", text: location.state?.flash || "" });
  const [target, setTarget] = useState(null); // post waiting for delete confirmation
  const [deleting, setDeleting] = useState(false);

  // Show the "Deleted …" banner once, not again after a page refresh.
  useEffect(() => {
    if (location.state?.flash) navigate(location.pathname, { replace: true, state: null });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const load = useCallback(async (signal) => {
    setStatus("loading");
    try {
      // GET /api/posts
      const res = await fetch("/api/posts", { signal });
      setPosts(await parseResponse(res));
      setStatus("ready");
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(errorMessage(err));
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    document.title = "Archive · BlogVault";
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  async function confirmDelete() {
    setDeleting(true);
    try {
      // DELETE /api/posts/:id
      const res = await fetch(`/api/posts/${target._id}`, { method: "DELETE" });
      await parseResponse(res);
      setPosts((list) => list.filter((p) => p._id !== target._id));
      setFlash({ type: "success", text: `Deleted “${target.title}”.` });
    } catch (err) {
      setFlash({ type: "error", text: errorMessage(err) });
    } finally {
      setDeleting(false);
      setTarget(null);
    }
  }

  // Search across title, author, tags and content.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      [p.title, p.author, p.content, ...(p.tags || [])].some((field) => field.toLowerCase().includes(q))
    );
  }, [posts, query]);

  // Group by month, keeping the newest-first order from the API.
  const groups = useMemo(() => {
    const map = new Map();
    for (const post of filtered) {
      const label = formatDate(post.createdAt, { month: "long", year: "numeric" });
      if (!map.has(label)) map.set(label, []);
      map.get(label).push(post);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Archive</h1>
          <p className="lede">
            {status === "ready" ? `${posts.length} ${posts.length === 1 ? "post" : "posts"} in total.` : "Every post, newest first."}
          </p>
        </div>
        <Link to="/create" className="btn btn-primary">Write a post</Link>
      </div>

      {flash.text && (
        <Alert type={flash.type} onDismiss={() => setFlash({ type: "success", text: "" })}>
          {flash.text}
        </Alert>
      )}

      {status === "loading" && <Loading label="Loading archive" rows={4} />}

      {status === "error" && <ErrorState message={error} onRetry={() => load()} />}

      {status === "ready" && posts.length === 0 && (
        <EmptyState
          title="The archive is empty"
          action={<Link to="/create" className="btn btn-primary">Write a post</Link>}
        >
          Posts you publish will be listed here by month.
        </EmptyState>
      )}

      {status === "ready" && posts.length > 0 && (
        <>
          <div className="search">
            <label htmlFor="search" className="visually-hidden">Search posts</label>
            <input
              id="search"
              type="search"
              placeholder="Search by title, author, tag or text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && <span className="search-count">{filtered.length} found</span>}
          </div>

          {groups.length === 0 ? (
            <EmptyState title="No matching posts">
              Nothing matches “{query}”. Try a different word.
            </EmptyState>
          ) : (
            groups.map(([label, items]) => (
              <section className="section" key={label} aria-label={label}>
                <h2 className="section-title">
                  {label} <span className="section-count">{items.length}</span>
                </h2>
                <div className="entries">
                  {items.map((post) => (
                    <PostSummary key={post._id} post={post} onDelete={setTarget} />
                  ))}
                </div>
              </section>
            ))
          )}
        </>
      )}

      <ConfirmDialog
        open={Boolean(target)}
        title="Delete this post?"
        message={target ? `“${target.title}” will be permanently removed. This can't be undone.` : ""}
        confirmLabel="Delete post"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setTarget(null)}
      />
    </div>
  );
}
