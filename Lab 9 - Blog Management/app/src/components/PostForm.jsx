import { useState } from "react";

const LIMITS = { title: 120, author: 60, content: 10000 };

// Shared by the Create page and the edit mode of the Post page.
//  initialValues -> { title, author, tags: [], content }
//  serverErrors  -> field messages returned by the API
export default function PostForm({
  initialValues,
  submitLabel,
  busyLabel,
  busy = false,
  serverErrors = {},
  onSubmit,
  onCancel,
}) {
  const [values, setValues] = useState({
    title: initialValues.title ?? "",
    author: initialValues.author ?? "",
    tags: (initialValues.tags ?? []).join(", "),
    content: initialValues.content ?? "",
  });
  const [errors, setErrors] = useState({});

  const change = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const found = {};
    if (!values.title.trim()) found.title = "Title is required.";
    if (!values.author.trim()) found.author = "Author name is required.";
    if (!values.content.trim()) found.content = "Write something before saving.";
    const tagList = values.tags.split(",").map((t) => t.trim()).filter(Boolean);
    if (tagList.length > 6) found.tags = "Use at most 6 tags.";
    return found;
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    onSubmit({
      title: values.title.trim(),
      author: values.author.trim(),
      tags: values.tags.split(",").map((t) => t.trim()).filter(Boolean),
      content: values.content.trim(),
    });
  };

  const err = (name) => errors[name] || serverErrors[name];

  const field = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: change,
    disabled: busy,
    "aria-invalid": err(name) ? "true" : undefined,
    "aria-describedby": err(name) ? `${name}-error` : undefined,
  });

  const showError = (name) =>
    err(name) ? <p className="field-error" id={`${name}-error`}>{err(name)}</p> : null;

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input type="text" maxLength={LIMITS.title} placeholder="A clear headline" className="input-title" {...field("title")} />
        {showError("title")}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="author">Author</label>
          <input type="text" maxLength={LIMITS.author} placeholder="Your name" autoComplete="name" {...field("author")} />
          {showError("author")}
        </div>
        <div className="field">
          <label htmlFor="tags">Tags <span className="optional">optional</span></label>
          <input type="text" placeholder="react, notes, travel" {...field("tags")} />
          <p className="hint">Separate with commas. Up to 6.</p>
          {showError("tags")}
        </div>
      </div>

      <div className="field">
        <label htmlFor="content">Content</label>
        <textarea rows={14} maxLength={LIMITS.content} placeholder="Start writing. Leave a blank line between paragraphs." {...field("content")} />
        <div className="field-foot">
          {showError("content")}
          <span className="counter">{values.content.length.toLocaleString()} / {LIMITS.content.toLocaleString()}</span>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? busyLabel : submitLabel}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
      </div>
    </form>
  );
}
