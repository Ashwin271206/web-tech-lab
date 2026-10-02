import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import PostForm from "../components/PostForm.jsx";
import { Alert, ErrorState, Loading } from "../components/StatusMessage.jsx";
import { errorMessage, formatDate, initials, parseResponse, readingTime } from "../utils.js";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const editing = searchParams.get("edit") === "1";

  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error | missing
  const [loadError, setLoadError] = useState("");

  const [flash, setFlash] = useState(location.state?.flash || "");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Show the "Post published." banner once, not again after a page refresh.
  useEffect(() => {
    if (location.state?.flash) navigate(location.pathname + location.search, { replace: true, state: null });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const load = useCallback(async (signal) => {
    setStatus("loading");
    try {
      // GET /api/posts/:id
      const res = await fetch(`/api/posts/${id}`, { signal });
      setPost(await parseResponse(res));
      setStatus("ready");
    } catch (err) {
      if (err.name === "AbortError") return;
      if (err.status === 404 || err.status === 400) {
        setStatus("missing");
      } else {
        setLoadError(errorMessage(err));
        setStatus("error");
      }
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  useEffect(() => {
    document.title = post ? `${post.title} · Bloggle` : "Bloggle";
  }, [post]);

  const stopEditing = () => {
    setSaveError("");
    setFieldErrors({});
    setSearchParams({}, { replace: true });
  };

  async function handleSave(values) {
    setSaving(true);
    setSaveError("");
    setFieldErrors({});
    try {
      // PATCH /api/posts/:id
      const res = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setPost(await parseResponse(res));
      setFlash("Changes saved.");
      stopEditing();
    } catch (err) {
      setFieldErrors(err.details || {});
      setSaveError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      // DELETE /api/posts/:id
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      await parseResponse(res);
      navigate("/archive", { state: { flash: `Deleted “${post.title}”.` } });
    } catch (err) {
      setConfirmOpen(false);
      setSaveError(errorMessage(err));
      setDeleting(false);
    }
  }

  if (status === "loading") return <div className="page page-narrow"><Loading label="Loading post" rows={1} /></div>;

  if (status === "missing") {
    return (
      <div className="page page-narrow">
        <div className="state">
          <h2>Post not found</h2>
          <p>It may have been deleted, or the link may be wrong.</p>
          <Link to="/archive" className="btn btn-primary">Go to the archive</Link>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return <div className="page page-narrow"><ErrorState message={loadError} onRetry={() => load()} /></div>;
  }

  const edited = new Date(post.updatedAt).getTime() - new Date(post.createdAt).getTime() > 1000;

  return (
    <div className="page page-narrow">
      <Link to="/archive" className="back-link">← All posts</Link>

      {flash && <Alert onDismiss={() => setFlash("")}>{flash}</Alert>}
      {saveError && !editing && <Alert type="error" onDismiss={() => setSaveError("")}>{saveError}</Alert>}

      {editing ? (
        <>
          <div className="page-head">
            <h1>Edit post</h1>
          </div>
          {saveError && <Alert type="error">{saveError}</Alert>}
          <PostForm
            initialValues={post}
            submitLabel="Save changes"
            busyLabel="Saving…"
            busy={saving}
            serverErrors={fieldErrors}
            onSubmit={handleSave}
            onCancel={stopEditing}
          />
        </>
      ) : (
        <article className="article">
          <header className="article-head">
            <h1>{post.title}</h1>
            <div className="article-meta">
              <span className="avatar" aria-hidden="true">{initials(post.author)}</span>
              <div>
                <p className="article-author">{post.author}</p>
                <p className="article-dates">
                  <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                  <span>{readingTime(post.content)} min read</span>
                  {edited && <span>Edited {formatDate(post.updatedAt)}</span>}
                </p>
              </div>
            </div>
            {post.tags?.length > 0 && (
              <ul className="tags" aria-label="Tags">
                {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            )}
          </header>

          <div className="article-body">
            {post.content.split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>)}
          </div>

          <footer className="article-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setSearchParams({ edit: "1" })}>
              Edit post
            </button>
            <button type="button" className="btn btn-quiet btn-quiet-danger" onClick={() => setConfirmOpen(true)}>
              Delete post
            </button>
          </footer>
        </article>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this post?"
        message={`“${post.title}” will be permanently removed. This can't be undone.`}
        confirmLabel="Delete post"
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
