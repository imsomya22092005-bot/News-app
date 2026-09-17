import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/");

    setTimeout(() => {
      document.getElementById("news-search-input")?.focus();
    }, 100);
  };

  return (
    <header className="site-header">
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


        {/* NAVIGATION */}
        <nav className="main-nav">

          <Link to="/">
            Home
          </Link>

          <Link to="/?category=general#latest">
            Latest
          </Link>

          <Link to="/?category=technology">
            Technology
          </Link>

          <Link to="/?category=business">
            Business
          </Link>

          <Link to="/?category=science">
            Science
          </Link>

        </nav>


        {/* SEARCH BUTTON */}
        <button
          className="search-button"
          onClick={handleSearch}
        >
          <span>⌕</span>
          Search
        </button>

      </div>
    </header>
  );
}

export default Header;