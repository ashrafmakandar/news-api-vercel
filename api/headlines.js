import axios from 'axios';

export default async function handler(req, res) {
  const { country = 'in' } = req.query;

  try {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWS_API_KEY}`;
    const response = await axios.get(url);

    const articles = response.data.articles.map((article) => ({
      title: article.title,
      source: article.source.name,
      url: article.url
    }));

    res.status(200).json({ country, total: articles.length, articles });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news...', details: error.message });
  }
}
