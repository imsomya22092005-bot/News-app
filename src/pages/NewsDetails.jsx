import { Link, useLocation } from "react-router-dom";

function NewsDetails() {
  const location = useLocation();
  const article = location.state?.article;

  if (!article) {
    return (
      <main className="details-page">
        <div className="article-not-found">
          <span className="eyebrow">404 — STORY UNAVAILABLE</span>

          <h1>Article not found.</h1>

          <p>
            This story is no longer available in the current session.
            Please return to the newsroom and choose another story.
          </p>

          <Link to="/" className="back-button">
            ← Back to stories
          </Link>
        </div>
      </main>
    );
  }

  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date unavailable";

  return (
    <main className="details-page">

      {/* BACK BUTTON */}
      <Link to="/" className="back-button">
        ← Back to stories
      </Link>


      {/* ARTICLE HEADER */}
      <article className="full-article">

        <div className="detail-meta">

          <span className="detail-source">
            {article.source?.name || "THE DAILY"}
          </span>

          <span className="detail-date">
            {publishedDate}
          </span>

        </div>


        <h1 className="detail-title">
          {article.title}
        </h1>


        {article.author && (
          <p className="article-author">
            By {article.author}
          </p>
        )}


        {/* HERO IMAGE */}
        {article.urlToImage && (
          <div className="detail-image-wrapper">

            <img
              className="detail-image"
              src={article.urlToImage}
              alt={article.title}
            />

          </div>
        )}


        {/* ARTICLE CONTENT */}
        <div className="article-body">

          {article.description && (
            <p className="article-description">
              {article.description}
            </p>
          )}

          {article.content && (
            <p>
              {article.content}
            </p>
          )}


          <div className="article-source-box">

            <div>
              <span className="eyebrow">
                ORIGINAL SOURCE
              </span>

              <p>
                Continue reading the complete story from the
                original publisher.
              </p>
            </div>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="original-story"
            >
              Read original story ↗
            </a>

          </div>

        </div>

      </article>

    </main>
  );
}

export default NewsDetails;