// Small helpers shared by the pages and components.

export function formatDate(value, options = { year: "numeric", month: "long", day: "numeric" }) {
  return new Date(value).toLocaleDateString(undefined, options);
}

export function readingTime(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export function excerpt(text = "", max = 190) {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return flat.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

// Turns a fetch() Response into JSON, or throws an Error with a readable message.
// error.details holds per-field messages sent by the API (400 responses).
export async function parseResponse(res) {
  let data = null;
  try {
    data = await res.json();
  } catch {
    // response had no JSON body
  }

  if (!res.ok) {
    const message =
      data?.error ||
      (res.status >= 500
        ? "The API isn't responding. Make sure the server is running (npm start inside /server)."
        : `Request failed (${res.status}).`);
    const error = new Error(message);
    error.status = res.status;
    error.details = data?.details || {};
    throw error;
  }
  return data;
}

// Converts any thrown value into a message that can be shown to the user.
export function errorMessage(err) {
  if (err?.name === "TypeError") {
    return "Can't reach the API. Make sure the server is running (npm start inside /server).";
  }
  return err?.message || "Something went wrong.";
}
