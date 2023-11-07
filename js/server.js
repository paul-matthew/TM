const express = require('express');
const { default: fetch } = require('node-fetch');
const app = express();
const PORT = 3000; // Set your desired port

app.use(express.json());

app.get('/products', async (req, res) => {
  try {
    const printifyResponse = await fetch('https://api.printify.com/v1/shops/11876498/products.json', {
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImIxN2I1YzVlOWUyODNlOTU3ZmRjOGRjYjQyZDlhZmU0Y2E3NjdlN2I3ZDJlOTk4Y2JlMTZlNTljNWU3ZDgyNGYyOTY0OWYwMmIzOGNjZTk4IiwiaWF0IjoxNjk5MjExNDY5LjY4NzE1MSwibmJmIjoxNjk5MjExNDY5LjY4NzE1NSwiZXhwIjoxNzMwODMzODY5LjY4MDE5Niwic3ViIjoiMTUzMTA4ODgiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.AR2sh86rYQVIjvW_wG8PbgH8PpEh_hntQEWs6K2R0Y4tcO7NpMoeIhL3qDb9j6s3yoJ8NClMdYk-zc4cK8k',
      },
    });

    const printifyData = await printifyResponse.json();
    res.json(printifyData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
