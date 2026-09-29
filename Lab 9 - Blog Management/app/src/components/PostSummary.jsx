import { Link } from "react-router-dom";
import { excerpt, formatDate, initials, readingTime } from "../utils.js";

function Tags({ tags = [] }) {
  if (!tags.length) return null;
  return (
    <ul className="tags" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

function Meta({ post }) {
  return (
    <div className="meta">
      <span className="meta-person">
        <span className="avatar" aria-hidden="true">{initials(post.author)}</span>
        <span className="meta-author">{post.author}</span>
      </span>
      <span>{readingTime(post.content)} min read</span>
    </div>
  );
}

/**
 * One post in a list.
 *  variant="featured" -> large lead story (Home)
 *  variant="entry"    -> ledger row with a date margin (Home + Archive)
 *  onDelete           -> when given, Edit / Delete actions are shown
 */
export default function PostSummary({ post, variant = "entry", onDelete }) {
  const url = `/posts/${post._id}`;

  if (variant === "featured") {
    return (
      <article className="featured">
        <p className="featured-date">{formatDate(post.createdAt)}</p>
        <h2 className="featured-title">
          <Link to={url} className="stretched">{post.title}</Link>
        </h2>
        <p className="featured-excerpt">{excerpt(post.content, 260)}</p>
        <Meta post={post} />
        <Tags tags={post.tags} />
      </article>
    );
  }

  const date = new Date(post.createdAt);
  return (
    <article className="entry">
      <time className="entry-date" dateTime={date.toISOString()}>
        <span className="day">{date.getDate()}</span>
        <span className="month">{date.toLocaleDateString(undefined, { month: "short", year: "numeric" })}</span>
      </time>

      <div className="entry-body">
        <h3 className="entry-title">
          <Link to={url} className="stretched">{post.title}</Link>
        </h3>
        <p className="entry-excerpt">{excerpt(post.content, 170)}</p>
        <Meta post={post} />
        <Tags tags={post.tags} />
      </div>

      {onDelete && (
        <div className="entry-actions">
          <Link to={`${url}?edit=1`} className="btn btn-quiet">Edit</Link>
          <button type="button" className="btn btn-quiet btn-quiet-danger" onClick={() => onDelete(post)}>
            Delete
          </button>
        </div>
      )}
    </article>
  );
}
