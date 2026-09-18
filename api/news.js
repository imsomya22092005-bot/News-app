export default async function handler(req, res) {
  try {
    const { endpoint = "top-headlines", ...query } = req.query;

    const params = new URLSearchParams({
      ...query,
      apiKey: process.env.NEWS_API_KEY,
    });

    const response = await fetch(
      `https://newsapi.org/v2/${endpoint}?${params.toString()}`
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("News API error:", error);

    res.status(500).json({
      message: "Failed to fetch news",
    });
  }
}