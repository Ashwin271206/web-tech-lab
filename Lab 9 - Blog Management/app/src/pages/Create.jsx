import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm.jsx";
import { Alert } from "../components/StatusMessage.jsx";
import { errorMessage, parseResponse } from "../utils.js";

const AUTHOR_KEY = "marginalia:author";

export default function Create() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => { document.title = "New post · BlogVault"; }, []);

  async function handleSubmit(values) {
    setBusy(true);
    setError("");
    setFieldErrors({});
    try {
      // POST /api/posts
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const created = await parseResponse(res);

      localStorage.setItem(AUTHOR_KEY, values.author); // remember the author for next time
      navigate(`/posts/${created._id}`, { state: { flash: "Post published." } });
    } catch (err) {
      setFieldErrors(err.details || {});
      setError(errorMessage(err));
      setBusy(false);
    }
  }

  return (
    <div className="page page-narrow">
      <div className="page-head">
        <div>
          <h1>New post</h1>
          <p className="lede">Write it, publish it, and edit it later whenever you like.</p>
        </div>
      </div>

      {error && <Alert type="error">{error}</Alert>}

      <PostForm
        initialValues={{ author: localStorage.getItem(AUTHOR_KEY) || "" }}
        submitLabel="Publish post"
        busyLabel="Publishing…"
        busy={busy}
        serverErrors={fieldErrors}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </div>
  );
}
