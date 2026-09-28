import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SavedStories() {
  const [savedStories, setSavedStories] = useState([]);

  useEffect(() => {
    const stories = JSON.parse(
      localStorage.getItem("savedArticles") || "[]"
    );

    setSavedStories(stories);
  }, []);

  const removeStory = (url) => {
    const updatedStories = savedStories.filter(
      (story) => story.url !== url
    );

    localStorage.setItem(
      "savedArticles",
      JSON.stringify(updatedStories)
    );

    setSavedStories(updatedStories);
  };

  return (
    <main className="saved-page">
      <div className="saved-header">
        <span className="eyebrow">YOUR COLLECTION</span>

        <h1>
          SAVED <span>STORIES</span>
        </h1>

        <p>
          Stories you saved to read later.
        </p>
      </div>

      {savedStories.length === 0 ? (
        <div className="empty-saved">
          <div className="empty-icon">♡</div>

          <h2>No saved stories yet</h2>

          <p>
            Save a story and it will appear here.
          </p>

          <Link to="/" className="back-home">
            Explore stories →
          </Link>
        </div>
      ) : (
        <div className="saved-grid">
          {savedStories.map((article, index) => {
            const articleId = encodeURIComponent(
              article.url || `${article.title}-${index}`
            );

            return (
              <article
                className="saved-card"
                key={article.url || index}
              >
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                  />
                ) : (
                  <div className="saved-image-placeholder">
                    NO IMAGE
                  </div>
                )}

                <div className="saved-card-content">
                  <span className="article-source">
                    {article.source?.name || "NEWS"}
                  </span>

                  <h2>
                    <Link
                      to={`/news/${articleId}`}
                      state={{ article }}
                    >
                      {article.title}
                    </Link>
                  </h2>

                  <p>
                    {article.description ||
                      "Read the complete story for more details."}
                  </p>

                  <div className="saved-card-footer">
                    <span>
                      {article.publishedAt
                        ? new Date(
                            article.publishedAt
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "Date unavailable"}
                    </span>

                    <button
                      onClick={() =>
                        removeStory(article.url)
                      }
                    >
                      Remove ♥
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default SavedStories;