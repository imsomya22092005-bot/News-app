import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import NewsList from "../components/NewsList";
import newsApi from "../services/newsApi";

function Home() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const category =
    searchParams.get("category") || "general";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     GET CATEGORY NEWS
  ========================= */

 useEffect(() => {
  getNews(category);

  const refreshTimer = setInterval(() => {
    getNews(category, true);
  }, 5 * 60 * 1000);

  return () => clearInterval(refreshTimer);
}, [category]);

  const getNews = async (
  selectedCategory,
  backgroundRefresh = false
) => {
  if (!backgroundRefresh) {
    setLoading(true);
  }

    try {
      setError("");

      const response = await newsApi.get("", {
  params: {
    endpoint: "top-headlines",
    country: "us",
    category: selectedCategory,
    pageSize: 10,
  },
});

      setNews(response.data.articles || []);
    } catch (error) {
      console.error(
        "Error fetching news:",
        error
      );

      setError(
        "We couldn't load the latest stories. Please try again."
      );

      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SEARCH NEWS
  ========================= */

  const searchNews = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await newsApi.get("", {
  params: {
    endpoint: "everything",
    q: query,
    language: "en",
    sortBy: "publishedAt",
    pageSize: 10,
  },
});

      setSearchResults(
        response.data.articles || []
      );
    } catch (error) {
      console.error(
        "Error searching news:",
        error
      );

      setError(
        "We couldn't search the newsroom. Please try again."
      );

      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SEARCH DEBOUNCE
  ========================= */

  useEffect(() => {
    const query = search.trim();

    if (!query) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      searchNews(query);
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  /* =========================
     WORLD REGION SEARCH
  ========================= */

  const exploreRegion = (region) => {
    setSearch(region);
    setSearchResults([]);

    setTimeout(() => {
      document
        .getElementById("news-search-input")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 100);
  };

  /* =========================
     HASH SCROLL
  ========================= */

  useEffect(() => {
    const hash = window.location.hash;

    if (hash === "#world") {
      setTimeout(() => {
        document
          .getElementById("world")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 150);
    }

    if (hash === "#latest") {
      setTimeout(() => {
        document
          .getElementById("latest")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 150);
    }
  }, []);

  /* =========================
     DISPLAYED NEWS
  ========================= */

  const displayedNews = search.trim()
    ? searchResults
    : news;

  /* =========================
     CATEGORIES
  ========================= */

  const categories = [
    {
      name: "All",
      value: "general",
    },
    {
      name: "Technology",
      value: "technology",
    },
    {
      name: "Business",
      value: "business",
    },
    {
      name: "Sports",
      value: "sports",
    },
    {
      name: "Entertainment",
      value: "entertainment",
    },
    {
      name: "Science",
      value: "science",
    },
  ];

  /* =========================
     WORLD REGIONS
  ========================= */

  const worldRegions = [
    {
      number: "01",
      icon: "🌏",
      name: "Asia",
      description: "Stories from across Asia",
      search: "Asia",
    },
    {
      number: "02",
      icon: "🌍",
      name: "Europe",
      description: "News shaping the continent",
      search: "Europe",
    },
    {
      number: "03",
      icon: "🌎",
      name: "Americas",
      description:
        "Stories from North & South America",
      search: "America",
    },
    {
      number: "04",
      icon: "🌍",
      name: "Africa",
      description:
        "What's happening across Africa",
      search: "Africa",
    },
    {
      number: "05",
      icon: "🌐",
      name: "Middle East",
      description:
        "Key stories and developments",
      search: "Middle East",
    },
    {
      number: "06",
      icon: "🌊",
      name: "Oceania",
      description:
        "News from Australia & beyond",
      search: "Australia",
    },
  ];

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loader"></div>

        <p>
          Gathering today's headlines...
        </p>
      </main>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <main className="error-screen">
        <span className="eyebrow">
          SOMETHING WENT WRONG
        </span>

        <h2>
          The newsroom is
          <br />
          <em>temporarily unavailable.</em>
        </h2>

        <p>{error}</p>

        <button
          className="retry-button"
          onClick={() => {
            if (search.trim()) {
              searchNews(search);
            } else {
              getNews(category);
            }
          }}
        >
          Try Again ↻
        </button>
      </main>
    );
  }

  return (
    <main className="home-page">

      {/* =========================
          HERO / INTRO
      ========================= */}

      <section className="hero-section">

        <div className="hero-copy">

          <span className="eyebrow">
            TODAY'S EDITION
          </span>

          <h2>
            Stories that
            <br />
            <em>matter.</em>
          </h2>

          <p className="hero-description">
            A curated look at the latest stories
            shaping technology, business, culture
            and the world.
          </p>

          <div className="hero-meta">

            <span>
              GLOBAL NEWSROOM
            </span>

            <span>
              EST. 2026
            </span>

          </div>

        </div>


        {/* =========================
            WORLD MAP VISUAL
        ========================= */}

        <div className="hero-map">

          <img
            src="/world-map.jpg"
            alt="World map"
          />

          <div className="map-overlay"></div>

          <div className="map-grain"></div>


          {/* LIVE BADGE */}

          <div className="live-sticker">

            <span className="live-dot"></span>

            <span>
              LIVE
            </span>

          </div>


          {/* GLOBAL BADGE */}

          <div className="global-sticker">
            <span>
              GLOBAL
            </span>

            <small>
              NEWS DESK
            </small>
          </div>


          {/* BREAKING BADGE */}

          <div className="breaking-sticker">
            BREAKING
          </div>


          {/* MAP LABEL */}

          <div className="map-caption">

            <span>
              WORLD
            </span>

            <span>
              01 — GLOBAL DESK
            </span>

          </div>


          {/* DECORATIVE PULSE */}

          <span className="map-pulse pulse-one"></span>
          <span className="map-pulse pulse-two"></span>
          <span className="map-pulse pulse-three"></span>

        </div>

      </section>


      {/* =========================
          SEARCH
      ========================= */}

      <section className="news-search">

        <div className="search-label">
          SEARCH THE NEWSROOM
        </div>

        <div className="search-box">

          <span className="search-icon">
            ⌕
          </span>

          <input
            id="news-search-input"
            type="text"
            placeholder="Search headlines, topics..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => {
                setSearch("");
                setSearchResults([]);
              }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

        </div>

      </section>


      {/* =========================
          CATEGORY FILTERS
      ========================= */}

      <section className="category-section">

        <span className="category-title">
          EXPLORE
        </span>

        <div className="category-list">

          {categories.map((item) => (

            <button
              key={item.value}
              className={
                category === item.value
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() => {

                setSearch("");
                setSearchResults([]);

                setSearchParams({
                  category: item.value,
                });

              }}
            >
              {item.name}
            </button>

          ))}

        </div>

      </section>


      {/* =========================
          FEATURED STORY
      ========================= */}

      {!search.trim() &&
        displayedNews.length > 0 && (

          <section className="featured-section">


            <Link
  to={`/news/${encodeURIComponent(
    displayedNews[0].url ||
      displayedNews[0].title
  )}`}
  state={{
    article: displayedNews[0],
  }}
  className="featured-image"
>

              {displayedNews[0].urlToImage ? (

                <img
                  src={
                    displayedNews[0].urlToImage
                  }
                  alt={
                    displayedNews[0].title
                  }
                />

              ) : (

                <div className="image-placeholder">
                  NO IMAGE
                </div>

              )}

              <span className="featured-label">
                FEATURED
              </span>

              <span className="featured-read">
                Read story →
              </span>

            </Link>


            <div className="featured-content">

              <span className="article-source">
                {displayedNews[0].source?.name ||
                  "NEWS"}
              </span>

              <h3>
                {displayedNews[0].title}
              </h3>

              <p>
                {displayedNews[0].description ||
                  "Read the latest story and discover what is happening around the world."}
              </p>

              <span className="article-date">
                {displayedNews[0].publishedAt
                  ? new Date(
                      displayedNews[0].publishedAt
                    ).toLocaleDateString()
                  : "Date unavailable"}
              </span>

            </div>

          </section>

        )}


      {/* =========================
          AROUND THE WORLD
      ========================= */}

      {!search.trim() && (

        <section
          className="world-section"
          id="world"
        >

          <div className="section-heading world-heading">

            <div>

              <span className="eyebrow">
                GLOBAL DESK
              </span>

              <h2>
                Around the <em>World</em>
              </h2>

            </div>

            <span className="story-count">
              GLOBAL STORIES
            </span>

          </div>


          <div className="world-grid">

            {worldRegions.map((region) => (

              <button
                key={region.name}
                className="world-card"
                onClick={() =>
                  exploreRegion(region.search)
                }
              >

                <span className="world-number">
                  {region.number}
                </span>

                <span className="world-icon">
                  {region.icon}
                </span>

                <h3>
                  {region.name}
                </h3>

                <p>
                  {region.description}
                </p>

                <span className="world-link">
                  Explore →
                </span>

              </button>

            ))}

          </div>

        </section>

      )}


      {/* =========================
          LATEST STORIES
      ========================= */}

      <section
        className="latest-section"
        id="latest"
      >

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              {search.trim()
                ? "SEARCH RESULTS"
                : "THE NEWSROOM"}
            </span>

            <h2>
              {search.trim()
                ? `Stories about "${search}"`
                : `${
                    categories.find(
                      (item) =>
                        item.value === category
                    )?.name || "Latest"
                  } Stories`}
            </h2>

          </div>

          <span className="story-count">
            {displayedNews.length} STORIES
          </span>

        </div>


        {displayedNews.length > 0 ? (

          <NewsList
            news={
              search.trim()
                ? displayedNews
                : displayedNews.slice(1)
            }
          />

        ) : (

          <div className="no-results">

            <h3>
              No stories found.
            </h3>

            <p>
              Try another search or category.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}

export default Home;