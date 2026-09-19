import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useSearchParams,
} from "react-router-dom";

function Header() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const activeCategory =
    searchParams.get("category") || "general";

  const isLatest =
    location.hash === "#latest";

  const isWorld =
    location.hash === "#world";

  const [currentDate, setCurrentDate] =
    useState(new Date());

  const [menuOpen, setMenuOpen] =
    useState(false);

    const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") !== "light"
);

useEffect(() => {
  document.body.classList.toggle("light-theme", !darkMode);
  localStorage.setItem(
    "theme",
    darkMode ? "dark" : "light"
  );
}, [darkMode]);

  /* =========================
     LIVE DATE & TIME
  ========================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dateText =
    currentDate.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  const timeText =
    currentDate.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }
    );

  /* =========================
     CLOSE MOBILE MENU
  ========================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">

      {/* =========================
          DATE BAR
      ========================= */}

      <div className="date-bar">

        <span>
          {dateText}
        </span>

        <span>
          {timeText} IST
        </span>

      </div>


      {/* =========================
          MAIN HEADER
      ========================= */}

      <div className="header-inner">

        {/* BRAND */}

        <div className="brand">

          <span className="brand-mark">
            N
          </span>

          <div>

            <h1>
              THE DAILY
            </h1>

            <span className="brand-tagline">
              News, beyond the headline.
            </span>

          </div>

        </div>


        {/* =========================
            DESKTOP NAVIGATION
        ========================= */}

        <nav className="main-nav">

          {/* HOME */}

          <Link
            to="/"
            className={
              activeCategory === "general" &&
              !isLatest &&
              !isWorld
                ? "active"
                : ""
            }
          >
            Home
          </Link>


          {/* LATEST */}

          <Link
            to="/?category=general#latest"
            className={
              activeCategory === "general" &&
              isLatest
                ? "active"
                : ""
            }
          >
            Latest
          </Link>


          {/* WORLD */}

          <Link
            to="/#world"
            className={
              isWorld
                ? "active"
                : ""
            }
          >
            World
          </Link>


          {/* TECHNOLOGY */}

          <Link
            to="/?category=technology"
            className={
              activeCategory === "technology"
                ? "active"
                : ""
            }
          >
            Technology
          </Link>


          {/* BUSINESS */}

          <Link
            to="/?category=business"
            className={
              activeCategory === "business"
                ? "active"
                : ""
            }
          >
            Business
          </Link>


          {/* SCIENCE */}

          <Link
            to="/?category=science"
            className={
              activeCategory === "science"
                ? "active"
                : ""
            }
          >
            Science
          </Link>


{/* ABOUT */}

<Link
  to="/#about"
  onClick={() => {
    setTimeout(() => {
      document
        .getElementById("about")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  }}
>
  About
</Link>


        </nav>


<button
  className="theme-toggle"
  onClick={() => setDarkMode(!darkMode)}
  aria-label="Toggle theme"
>
  {darkMode ? "☀️" : "🌙"}
</button>

        {/* =========================
            HAMBURGER
        ========================= */}

        <button
          className="menu-button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >

          <span></span>
          <span></span>
          <span></span>

        </button>

      </div>


      {/* =========================
          MOBILE MENU
      ========================= */}

      <div
        className={
          menuOpen
            ? "mobile-menu open"
            : "mobile-menu"
        }
      >

        {/* HOME */}

        <Link
          to="/"
          className={
            activeCategory === "general" &&
            !isLatest &&
            !isWorld
              ? "active"
              : ""
          }
          onClick={closeMenu}
        >
          Home
        </Link>


        {/* LATEST */}

        <Link
          to="/?category=general#latest"
          className={
            activeCategory === "general" &&
            isLatest
              ? "active"
              : ""
          }
          onClick={closeMenu}
        >
          Latest
        </Link>


        {/* WORLD */}

        <Link
          to="/#world"
          className={
            isWorld
              ? "active"
              : ""
          }
          onClick={closeMenu}
        >
          World
        </Link>


        {/* TECHNOLOGY */}

        <Link
          to="/?category=technology"
          className={
            activeCategory === "technology"
              ? "active"
              : ""
          }
          onClick={closeMenu}
        >
          Technology
        </Link>


        {/* BUSINESS */}

        <Link
          to="/?category=business"
          className={
            activeCategory === "business"
              ? "active"
              : ""
          }
          onClick={closeMenu}
        >
          Business
        </Link>


        {/* SCIENCE */}

        <Link
          to="/?category=science"
          className={
            activeCategory === "science"
              ? "active"
              : ""
          }
          onClick={closeMenu}
        >
          Science
        </Link>

{/* ABOUT */}

<Link
  to="/#about"
  onClick={closeMenu}
>
  About
</Link>

      </div>

    </header>
  );
}

export default Header;