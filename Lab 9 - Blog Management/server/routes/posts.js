// REST routes for /api/posts
//
//   GET     /api/posts        -> list all posts (newest first, optional ?limit=N)
//   GET     /api/posts/:id    -> one post
//   POST    /api/posts        -> create a post
//   PATCH   /api/posts/:id    -> update a post   (PUT does the same)
//   DELETE  /api/posts/:id    -> delete a post
import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.js";

const router = express.Router();
const posts = db.collection("posts");

/* ------------------------------ helpers ------------------------------ */

// Wraps an async handler so any thrown error reaches the error middleware.
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const isValidId = (id) => /^[a-f\d]{24}$/i.test(id);

// Accepts an array or a comma-separated string; returns a clean, unique list.
function normalizeTags(input) {
  const list = Array.isArray(input) ? input : String(input ?? "").split(",");
  const clean = list
    .map((t) => String(t).trim().toLowerCase())
    .filter(Boolean);
  return [...new Set(clean)];
}

// Validates and cleans the request body.
// partial = true  -> only the fields that were sent are checked (used for updates).
function validatePost(body = {}, { partial = false } = {}) {
  const errors = {};
  const data = {};
  const sent = (key) => body[key] !== undefined;

  if (!partial || sent("title")) {
    const title = typeof body.title === "string" ? body.title.trim() : "";
    if (!title) errors.title = "Title is required.";
    else if (title.length > 120) errors.title = "Title must be 120 characters or fewer.";
    else data.title = title;
  }

  if (!partial || sent("author")) {
    const author = typeof body.author === "string" ? body.author.trim() : "";
    if (!author) errors.author = "Author name is required.";
    else if (author.length > 60) errors.author = "Author name must be 60 characters or fewer.";
    else data.author = author;
  }

  if (!partial || sent("content")) {
    const content = typeof body.content === "string" ? body.content.trim() : "";
    if (!content) errors.content = "Write something before saving.";
    else if (content.length > 10000) errors.content = "Content must be 10,000 characters or fewer.";
    else data.content = content;
  }

  if (sent("tags") || !partial) {
    const tags = normalizeTags(body.tags);
    if (tags.length > 6) errors.tags = "Use at most 6 tags.";
    else if (tags.some((t) => t.length > 24)) errors.tags = "Each tag must be 24 characters or fewer.";
    else data.tags = tags;
  }

  return { errors, data };
}

const badRequest = (res, errors) =>
  res.status(400).json({ error: "Please fix the highlighted fields.", details: errors });

/* -------------------------------- READ -------------------------------- */

// GET /api/posts  (all posts, newest first)
router.get(
  "/",
  wrap(async (req, res) => {
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 0, 0), 100);
    let cursor = posts.find({}).sort({ createdAt: -1 });
    if (limit) cursor = cursor.limit(limit);
    res.json(await cursor.toArray());
  })
);

// GET /api/posts/:id  (single post)
router.get(
  "/:id",
  wrap(async (req, res) => {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: "Invalid post id." });

    const post = await posts.findOne({ _id: new ObjectId(req.params.id) });
    if (!post) return res.status(404).json({ error: "Post not found." });
    res.json(post);
  })
);

/* ------------------------------- CREATE ------------------------------- */

// POST /api/posts
router.post(
  "/",
  wrap(async (req, res) => {
    const { errors, data } = validatePost(req.body);
    if (Object.keys(errors).length) return badRequest(res, errors);

    const now = new Date();
    const doc = { ...data, createdAt: now, updatedAt: now };
    const result = await posts.insertOne(doc);

    res.status(201).json({ ...doc, _id: result.insertedId });
  })
);

/* ------------------------------- UPDATE ------------------------------- */

const updatePost = wrap(async (req, res) => {
  if (!isValidId(req.params.id)) return res.status(400).json({ error: "Invalid post id." });

  const { errors, data } = validatePost(req.body, { partial: true });
  if (Object.keys(errors).length) return badRequest(res, errors);
  if (!Object.keys(data).length) return res.status(400).json({ error: "Nothing to update." });

  const updated = await posts.findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    { $set: { ...data, updatedAt: new Date() } },
    { returnDocument: "after" }
  );
  if (!updated) return res.status(404).json({ error: "Post not found." });

  res.json(updated);
});

// PATCH (partial update) and PUT are both accepted.
router.patch("/:id", updatePost);
router.put("/:id", updatePost);

/* ------------------------------- DELETE ------------------------------- */

// DELETE /api/posts/:id
router.delete(
  "/:id",
  wrap(async (req, res) => {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: "Invalid post id." });

    const result = await posts.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Post not found." });

    res.json({ message: "Post deleted.", _id: req.params.id });
  })
);

export default router;
