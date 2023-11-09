const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fetch = require('node-fetch'); // Ensure you've installed the 'node-fetch' package

const app = express();
const PORT = process.env.PORT || 5000; 

// Replace this function with your own logic to publish a product using the received ID
const publishProduct = async (productId) => {
    try {
      const publishResponse = await fetch(`https://api.printify.com/v1/shops/11876498/products/${productId}/publish.json`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImIxN2I1YzVlOWUyODNlOTU3ZmRjOGRjYjQyZDlhZmU0Y2E3NjdlN2I3ZDJlOTk4Y2JlMTZlNTljNWU3ZDgyNGYyOTY0OWYwMmIzOGNjZTk4IiwiaWF0IjoxNjk5MjExNDY5LjY4NzE1MSwibmJmIjoxNjk5MjExNDY5LjY4NzE1NSwiZXhwIjoxNzMwODMzODY5LjY4MDE5Niwic3ViIjoiMTUzMTA4ODgiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.AR2sh86rYQVIjvW_wG8PbgH8PpEh_hntQEWs6K2R0Y4tcO7NpMoeIhL3qDb9j6s3yoJ8NClMdYk-zc4cK8k', // Replace with your Printify access token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: true,
          description: true,
          images: true,
          variants: true,
          tags: true,
          keyFeatures: true,
          shipping_template: true,
        }),
      });
  
      if (publishResponse.ok) {
        console.log(`Product ${productId} published successfully.`);
      } else {
        console.error(`Failed to publish product ${productId}.`);
      }
    } catch (error) {
      console.error('Error in publishing product:', error);
    }
  };
  

const apiProxy = createProxyMiddleware('/products', {
  target: 'https://api.printify.com/v1/shops/11876498',
  changeOrigin: true,
  pathRewrite: {
    '^/products': '/products.json',
  },
  onProxyReq: function (proxyReq) {
    proxyReq.setHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImIxN2I1YzVlOWUyODNlOTU3ZmRjOGRjYjQyZDlhZmU0Y2E3NjdlN2I3ZDJlOTk4Y2JlMTZlNTljNWU3ZDgyNGYyOTY0OWYwMmIzOGNjZTk4IiwiaWF0IjoxNjk5MjExNDY5LjY4NzE1MSwibmJmIjoxNjk5MjExNDY5LjY4NzE1NSwiZXhwIjoxNzMwODMzODY5LjY4MDE5Niwic3ViIjoiMTUzMTA4ODgiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.AR2sh86rYQVIjvW_wG8PbgH8PpEh_hntQEWs6K2R0Y4tcO7NpMoeIhL3qDb9j6s3yoJ8NClMdYk-zc4cK8k');
  },
});

app.use((req, res, next) => {
    let access = '';
  
    // Check the origin of the request
    if (req.headers.origin === 'http://127.0.0.1:5500') {
      access = 'http://127.0.0.1:5500';
    } else if (req.headers.origin === 'https://paul-matthew.github.io') {
      access = 'https://paul-matthew.github.io';
    }
    
    // Set the appropriate Access-Control-Allow-Origin header
    res.header('Access-Control-Allow-Origin', access);
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  

app.get('/fetch-and-publish-products', async (req, res) => {
  try {
    const printifyResponse = await fetch('https://api.printify.com/v1/shops/11876498/products.json', {
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImIxN2I1YzVlOWUyODNlOTU3ZmRjOGRjYjQyZDlhZmU0Y2E3NjdlN2I3ZDJlOTk4Y2JlMTZlNTljNWU3ZDgyNGYyOTY0OWYwMmIzOGNjZTk4IiwiaWF0IjoxNjk5MjExNDY5LjY4NzE1MSwibmJmIjoxNjk5MjExNDY5LjY4NzE1NSwiZXhwIjoxNzMwODMzODY5LjY4MDE5Niwic3ViIjoiMTUzMTA4ODgiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.AR2sh86rYQVIjvW_wG8PbgH8PpEh_hntQEWs6K2R0Y4tcO7NpMoeIhL3qDb9j6s3yoJ8NClMdYk-zc4cK8k',
      }
    });

    if (printifyResponse.ok) {
      const products = await printifyResponse.json();

      // Publish products retrieved from Printify
      for (const product of products) {
        const productId = product.id;
        await publishProduct(productId);
      }

      res.status(200).json({ message: 'Products fetched and published successfully' });
    } else {
      res.status(500).json({ error: 'Failed to fetch products from Printify' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch and publish products' });
  }
});

app.use(apiProxy);

app.listen(PORT, () => {
  console.log(`Proxy server running on PORT ${PORT}`);
});


