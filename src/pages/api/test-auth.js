// This is a Next.js API route that proxies requests to our Express server
// This is needed because we're running the Express server on a different port (5000)
// while Next.js runs on port 3000

const handler = async (req, res) => {
  const { method, body, headers } = req;
  const apiUrl = `http://localhost:5000${req.url.replace('/api', '')}`;

  try {
    const response = await fetch(apiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(headers.authorization && { Authorization: headers.authorization }),
      },
      credentials: 'include',
      ...(method !== 'GET' && { body: JSON.stringify(body) }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
