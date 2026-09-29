import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostSummary from "../components/PostSummary.jsx";
import { EmptyState, ErrorState, Loading } from "../components/StatusMessage.jsx";
import { errorMessage, parseResponse } from "../utils.js";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState("");

  const load = useCallback(async (signal) => {
    setStatus("loading");
    try {
      // GET /api/posts  (newest first; the latest 7 are enough for the home page)
      const res = await fetch("/api/posts?limit=7", { signal });
      setPosts(await parseResponse(res));
      setStatus("ready");
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(errorMessage(err));
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    document.title = "BlogVault";
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const [latest, ...earlier] = posts;

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Latest posts</h1>
          <p className="lede">The newest writing, straight from the database.</p>
        </div>
        <Link to="/create" className="btn btn-primary">Write a post</Link>
      </div>

      {status === "loading" && <Loading label="Loading posts" rows={3} />}

      {status === "error" && <ErrorState message={error} onRetry={() => load()} />}

      {status === "ready" && !latest && (
        <EmptyState
          title="No posts yet"
          action={<Link to="/create" className="btn btn-primary">Write the first post</Link>}
        >
          Your blog is empty. Publish a post and it will appear here.
        </EmptyState>
      )}

      {status === "ready" && latest && (
        <>
          <PostSummary post={latest} variant="featured" />

          {earlier.length > 0 && (
            <section aria-labelledby="earlier-heading" className="section">
              <h2 id="earlier-heading" className="section-title">Earlier posts</h2>
              <div className="entries">
                {earlier.map((post) => (
                  <PostSummary key={post._id} post={post} />
                ))}
              </div>
              <p className="section-link">
                <Link to="/archive">Browse the full archive</Link>
              </p>
            </section>
          )}
        </>
      )}
    </div>
  );
}
