import { Link } from "react-router-dom";

function NewsItem({ article, index }) {
  const articleId = encodeURIComponent(
    article.url || `${article.title}-${index}`
  );

  const saveArticle = () => {
    sessionStorage.setItem(
      `article-${articleId}`,
      JSON.stringify(article)
    );
  };

  return (
    <article className="news-card">
      {/* ARTICLE IMAGE */}
      <Link
        to={`/news/${articleId}`}
        state={{ article }}
        onClick={saveArticle}
        className="news-card-image"
      >
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
          />
        ) : (
          <div className="image-placeholder">
            NO IMAGE
          </div>
        )}

        <span className="card-arrow">↗</span>
      </Link>

      {/* ARTICLE CONTENT */}
      <div className="news-card-content">
        <div className="card-top">
          <span className="article-source">
            {article.source?.name || "NEWS"}
          </span>

          <span className="card-number">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* TITLE */}
        <h2>
          <Link
            to={`/news/${articleId}`}
            state={{ article }}
            onClick={saveArticle}
          >
            {article.title}
          </Link>
        </h2>

        {/* DESCRIPTION */}
        <p>
          {article.description ||
            "Read the complete story for more details."}
        </p>

        {/* FOOTER */}
        <div className="news-card-footer">
          <span>
            {article.publishedAt
              ? new Date(
                  article.publishedAt
                ).toLocaleDateString()
              : "Date unavailable"}
          </span>

          <Link
            to={`/news/${articleId}`}
            state={{ article }}
            onClick={saveArticle}
            className="read-more"
          >
            Read story →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default NewsItem;