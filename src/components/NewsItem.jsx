import { useState } from "react";
import { Link } from "react-router-dom";

function NewsItem({ article, index }) {
  const articleId = encodeURIComponent(
    article.url || `${article.title}-${index}`
  );

  const [isSaved, setIsSaved] = useState(() => {
  const savedArticles = JSON.parse(
    localStorage.getItem("savedArticles") || "[]"
  );

  return savedArticles.some(
    (saved) => saved.url === article.url
  );
});

  const text = `${article.title || ""} ${
  article.description || ""
}`;

const wordCount = text.trim().split(/\s+/).length;

const readingTime = Math.max(
  1,
  Math.ceil(wordCount / 200)
);

 const saveArticle = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const savedArticles = JSON.parse(
    localStorage.getItem("savedArticles") || "[]"
  );

  const alreadySaved = savedArticles.some(
    (saved) => saved.url === article.url
  );

  if (alreadySaved) {
    const updatedArticles = savedArticles.filter(
      (saved) => saved.url !== article.url
    );

    localStorage.setItem(
      "savedArticles",
      JSON.stringify(updatedArticles)
    );

    setIsSaved(false);
  } else {
    savedArticles.push(article);

    localStorage.setItem(
      "savedArticles",
      JSON.stringify(savedArticles)
    );

    setIsSaved(true);
  }
};

  return (
    <article className="news-card">

      {/* ARTICLE IMAGE */}
      <div className="news-card-image">
  <Link
    to={`/news/${articleId}`}
    state={{ article }}
    className="news-image-link"
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
  </Link>

  <button
  className={`save-story ${
    isSaved ? "saved" : ""
  }`}
  onClick={saveArticle}
  aria-label={
    isSaved ? "Remove saved story" : "Save story"
  }
>
  {isSaved ? "♥" : "♡"}
</button>
</div>

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
      ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Date unavailable"}

  {" · "}

  {readingTime} min read
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