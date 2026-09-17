import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Header() {
  const [searchParams] = useSearchParams();

  const activeCategory =
    searchParams.get("category") || "general";

  const isLatest = window.location.hash === "#latest";

  const [currentDate, setCurrentDate] = useState(new Date());

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dateText = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeText = currentDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">

      {/* TOP DATE BAR */}
      <div className="date-bar">
        <span>{dateText}</span>
        <span>{timeText} IST</span>
      </div>


      {/* MAIN HEADER */}
      <div className="header-inner">

        {/* BRAND */}
        <div className="brand">
          <span className="brand-mark">N</span>

          <div>
            <h1>THE DAILY</h1>

            <span className="brand-tagline">
              News, beyond the headline.
            </span>
          </div>
        </div>


        {/* DESKTOP NAVIGATION */}
        <nav className="main-nav">

          <Link
            to="/"
            className={
              activeCategory === "general" && !isLatest
                ? "active"
                : ""
            }
          >
            Home
          </Link>

          <Link
            to="/?category=general#latest"
            className={
              activeCategory === "general" && isLatest
                ? "active"
                : ""
            }
          >
            Latest
          </Link>

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

        </nav>


        {/* HAMBURGER BUTTON */}
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>


      {/* MOBILE MENU */}
      <div
        className={
          menuOpen
            ? "mobile-menu open"
            : "mobile-menu"
        }
      >

        <Link
          to="/"
          className={
            activeCategory === "general" && !isLatest
              ? "active"
              : ""
          }
          onClick={closeMenu}
        >
          Home
        </Link>

        <Link
          to="/?category=general#latest"
          className={
            activeCategory === "general" && isLatest
              ? "active"
              : ""
          }
          onClick={closeMenu}
        >
          Latest
        </Link>

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

      </div>

    </header>
  );
}

export default Header;