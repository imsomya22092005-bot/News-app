import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom";

function NewsDetails() {
  const location = useLocation();
  const { id } = useParams();

  // Article coming from the clicked card
  const articleFromState =
    location.state?.article;

  // Try to get the same article from sessionStorage
  const savedArticle = sessionStorage.getItem(
    `article-${id}`
  );

  let savedArticleData = null;

  try {
    savedArticleData = savedArticle
      ? JSON.parse(savedArticle)
      : null;
  } catch (error) {
    console.error(
      "Could not read saved article:",
      error
    );
  }

  // Use clicked article first,
  // otherwise use saved article
  const article =
    articleFromState || savedArticleData;

  // If article doesn't exist
  if (!article) {
    return (
      <main className="details-page">
        <div className="article-not-found">
          <span className="eyebrow">
            404 — STORY UNAVAILABLE
          </span>

          <h1>
            Article not found.
          </h1>

          <p>
            This story is not available in the
            current session. Please return to the
            newsroom and select another article.
          </p>

          <Link
            to="/"
            className="back-button"
          >
            ← Back to stories
          </Link>
        </div>
      </main>
    );
  }

  // Publication date
  const publishedDate =
    article.publishedAt
      ? new Date(
          article.publishedAt
        ).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Date unavailable";

  return (
    <main className="details-page">
      {/* BACK BUTTON */}
      <Link
        to="/"
        className="back-button"
      >
        ← Back to stories
      </Link>

      {/* FULL ARTICLE */}
      <article className="full-article">

        {/* SOURCE + DATE */}
        <div className="detail-meta">
          <span className="detail-source">
            {article.source?.name ||
              "THE DAILY"}
          </span>

          <span className="detail-date">
            {publishedDate}
          </span>
        </div>

        {/* TITLE */}
        <h1 className="detail-title">
          {article.title}
        </h1>

        {/* AUTHOR */}
        {article.author && (
          <p className="article-author">
            By {article.author}
          </p>
        )}

        {/* IMAGE */}
        {article.urlToImage ? (
          <div className="detail-image-wrapper">
            <img
              className="detail-image"
              src={article.urlToImage}
              alt={article.title}
            />
          </div>
        ) : (
          <div className="detail-image-placeholder">
            NO IMAGE AVAILABLE
          </div>
        )}

        {/* ARTICLE TEXT */}
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

          {/* ORIGINAL SOURCE */}
          {article.url && (
            <div className="article-source-box">
              <div>
                <span className="eyebrow">
                  ORIGINAL SOURCE
                </span>

                <p>
                  Continue reading the complete
                  story from the original publisher.
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
          )}

        </div>
      </article>
    </main>
  );
}

export default NewsDetails;