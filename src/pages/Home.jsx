import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import NewsList from "../components/NewsList";
import newsApi from "../services/newsApi";

function Home() {
  const [news, setNews] = useState([]);
const [search, setSearch] = useState("");
const [searchParams, setSearchParams] = useSearchParams();

const category = searchParams.get("category") || "general";
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

  useEffect(() => {
    getNews(category);
  }, [category]);

  const getNews = async (selectedCategory) => {
    setLoading(true);

    try {
  setError("");

  const response = await newsApi.get("/top-headlines", {
    params: {
      country: "us",
      category: selectedCategory,
      pageSize: 10,
    },
  });

  setNews(response.data.articles || []);

} catch (error) {
  console.error("Error fetching news:", error);

  setError(
    "We couldn't load the latest stories. Please try again."
  );

  setNews([]);

} finally {
  setLoading(false);
}
  };

  // Search inside currently selected category
  const filteredNews = news.filter((article) => {
    const searchText = search.toLowerCase();

    return (
      article.title?.toLowerCase().includes(searchText) ||
      article.description?.toLowerCase().includes(searchText)
    );
  });

  const categories = [
    { name: "All", value: "general" },
    { name: "Technology", value: "technology" },
    { name: "Business", value: "business" },
    { name: "Sports", value: "sports" },
    { name: "Entertainment", value: "entertainment" },
    { name: "Science", value: "science" },
  ];

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loader"></div>
        <p>Gathering today's headlines...</p>
      </main>
    );
  }

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

      <p>
        {error}
      </p>

      <button
        className="retry-button"
        onClick={() => getNews(category)}
      >
        Try Again ↻
      </button>

    </main>
  );
}

  return (
    <main className="home-page">

      {/* INTRO */}
      <section className="intro-section">
        <div>
          <span className="eyebrow">TODAY'S EDITION</span>

          <h2>
            Stories that
            <br />
            <em>matter.</em>
          </h2>
        </div>

        <p className="intro-text">
          A curated look at the latest stories shaping
          technology, business, culture and the world.
        </p>
      </section>


      {/* SEARCH */}
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
      onChange={(e) => setSearch(e.target.value)}
    />

    {search && (
      <button
        className="clear-search"
        onClick={() => setSearch("")}
      >
        ×
      </button>
    )}

  </div>

</section>


      {/* CATEGORY FILTERS */}
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
  setSearchParams({ category: item.value });
  setSearch("");
}}
 
            >
              {item.name}
            </button>
          ))}

        </div>

      </section>


            {/* FEATURED NEWS */}
      {!search && filteredNews.length > 0 && (
        <section className="featured-section">

          <Link
            to="/news/featured"
            state={{ article: filteredNews[0] }}
            className="featured-image"
          >

            {filteredNews[0].urlToImage && (
              <img
                src={filteredNews[0].urlToImage}
                alt={filteredNews[0].title}
              />
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
              {filteredNews[0].source?.name || "NEWS"}
            </span>

            <h3>
              {filteredNews[0].title}
            </h3>

            <p>
              {filteredNews[0].description ||
                "Read the latest story and discover what is happening around the world."}
            </p>

            <span className="article-date">
              {new Date(
                filteredNews[0].publishedAt
              ).toLocaleDateString()}
            </span>

          </div>

        </section>
      )}


      {/* LATEST NEWS */}
      <section className="latest-section" id="latest">

        <div className="section-heading">

          <div>
            <span className="eyebrow">
              {search ? "SEARCH RESULTS" : "THE NEWSROOM"}
            </span>

            <h2>
              {search
                ? "Matching Stories"
                : categories.find(
                    (item) => item.value === category
                  )?.name + " Stories"}
            </h2>
          </div>

          <span className="story-count">
            {filteredNews.length} STORIES
          </span>

        </div>


        {filteredNews.length > 0 ? (
          <NewsList
            news={
              search
                ? filteredNews
                : filteredNews.slice(1)
            }
          />
        ) : (
          <div className="no-results">

            <h3>No stories found.</h3>

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
