import NewsItem from "./NewsItem";

function NewsList({ news }) {
  return (
    <div className="news-grid">
      {news.map((article, index) => (
        <NewsItem
          key={index}
          article={article}
          index={index}
        />
      ))}
    </div>
  );
}

export default NewsList;