import axios from 'axios';

export default async function handler(req, res) {
  const { q = 'India' } = req.query;

  try {
    const url = `https://newsapi.org/v2/everything?q=${q}&apiKey=${process.env.NEWS_API_KEY}`;
    const response = await axios.get(url);

    const articles = response.data.articles.map((article) => ({
      title: article.title,
      description:article.description,
      urlToImage:article.urlToImage,
      source: article.source.name,
      publishedAt:article.publishedAt,
      url: article.url,
      content:article.content
    }));

    res.status(200).json({ q, total: articles.length, articles });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news...', details: error.message });
  }
}
