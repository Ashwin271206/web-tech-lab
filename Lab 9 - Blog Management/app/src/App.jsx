import { useEffect } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import Post from "./pages/Post.jsx";
import Archive from "./pages/Archive.jsx";
import { EmptyState } from "./components/StatusMessage.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  useEffect(() => { document.title = "Page not found · BlogVault"; }, []);
  return (
    <EmptyState
      title="This page doesn't exist"
      action={<Link to="/" className="btn btn-primary">Go to the home page</Link>}
    >
      The address may be mistyped, or the page may have moved.
    </EmptyState>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollToTop />

      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="BlogVault home">
            <span className="brand-mark" aria-hidden="true" />
            BlogVault
          </Link>
          <nav className="nav" aria-label="Main">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/archive">Archive</NavLink>
            <NavLink to="/create" className="btn btn-primary nav-cta">New post</NavLink>
          </nav>
        </div>
      </header>

      <main id="main" className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container">BlogVault · React, Express and MongoDB Atlas</div>
      </footer>
    </>
  );
}
