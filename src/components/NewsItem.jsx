import { Link } from "react-router-dom";

function NewsItem({ article, index }) {

  const openArticle = () => {
    sessionStorage.setItem(
      "selectedArticle",
      JSON.stringify(article)
    );
  };

  return (
    <article className="news-card">

      <Link
        to={`/news/${index}`}
        state={{ article }}
        onClick={openArticle}
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

        <span className="card-arrow">
          ↗
        </span>
      </Link>


      <div className="news-card-content">

        <div className="card-top">

          <span className="article-source">
            {article.source?.name || "NEWS"}
          </span>

          <span className="card-number">
            {String(index + 1).padStart(2, "0")}
          </span>

        </div>


        <h2>
          <Link
            to={`/news/${index}`}
            state={{ article }}
            onClick={openArticle}
          >
            {article.title}
          </Link>
        </h2>


        <p>
          {article.description ||
            "Read the complete story for more details."}
        </p>


        <div className="news-card-footer">

          <span>
            {new Date(
              article.publishedAt
            ).toLocaleDateString()}
          </span>

          <Link
            to={`/news/${index}`}
            state={{ article }}
            onClick={openArticle}
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