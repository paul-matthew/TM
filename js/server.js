const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fetch = require('node-fetch'); // Ensure you've installed the 'node-fetch' package
require('dotenv').config();

const app = express();
const printifyApiKey = process.env.PRINTIFY_API_KEY || "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImIxN2I1YzVlOWUyODNlOTU3ZmRjOGRjYjQyZDlhZmU0Y2E3NjdlN2I3ZDJlOTk4Y2JlMTZlNTljNWU3ZDgyNGYyOTY0OWYwMmIzOGNjZTk4IiwiaWF0IjoxNjk5MjExNDY5LjY4NzE1MSwibmJmIjoxNjk5MjExNDY5LjY4NzE1NSwiZXhwIjoxNzMwODMzODY5LjY4MDE5Niwic3ViIjoiMTUzMTA4ODgiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.AR2sh86rYQVIjvW_wG8PbgH8PpEh_hntQEWs6K2R0Y4tcO7NpMoeIhL3qDb9j6s3yoJ8NClMdYk-zc4cK8k"
const PORT = process.env.PORT || 5000; 
const blogApiKey = process.env.DATOCMS_API || "bc4a449b76547409adcd6e3392bc6e"

const publishProduct = async (productId) => {
    try {
        const publishResponse = await fetch(`https://api.printify.com/v1/shops/11876498/products/${productId}/publish.json`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${printifyApiKey}`, 
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

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error my guy', details: err.message });
};

const apiProxy = createProxyMiddleware('/products', {
  target: 'https://api.printify.com/v1/shops/11876498',
  changeOrigin: true,
  pathRewrite: {
    '^/products': '/products.json',
  },
  onProxyReq: function (proxyReq) {
    proxyReq.setHeader('Authorization', `Bearer ${printifyApiKey}`);
  },
});

const orderProxy = createProxyMiddleware('/orders', {
  target: 'https://api.printify.com/v1/shops/11876498',
  changeOrigin: true,
  pathRewrite: {
    '^/orders': '/orders.json',
  },
  onProxyReq: function (proxyReq) {
    proxyReq.setHeader('Authorization', `Bearer ${printifyApiKey}`);
  },
});

const blogProxy = createProxyMiddleware('/blogs', {
  target: 'https://graphql.datocms.com/',
  changeOrigin: true,
  pathRewrite: {
    '^/blogs': '/blogs.json',
  },
  onProxyReq: function (proxyReq) {
    proxyReq.setHeader('Authorization', `Bearer ${blogApiKey}`);
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
        Authorization: `Bearer ${printifyApiKey}`,
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
    // Handle any errors that occur during order processing
    console.error('Error processing order:', error);
  
    // Log additional details
    console.error('Request body:');
  
    // Send a detailed error response
    res.status(500).json({ error: 'Failed to process order', details: error.message });
  }  
});


app.use(express.json());

app.get('/blogs', async (req, res) => {
  try {
    const datoCMSResponse = await fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${blogApiKey}`,
      },
      body: JSON.stringify({
        query: `{
          allBlogs {
            id
            blogTitle
            dateField
            blogDescription
            blogImage { url }
          }
        }`
      }),
    });

    if (datoCMSResponse.ok) {
      const data = await datoCMSResponse.json();
      res.json(data.data.allBlogs);
    } else {
      console.error('Failed to fetch blogs from DatoCMS.');
      res.status(500).json({ error: 'Failed to fetch blogs from DatoCMS' });
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Order

app.post('/orders', async (req, res) => {
  try {
    console.log('Request Body:', req.body);

    // const clientLineItems = req.body.lineItems || [];

    // const serverLineItems = clientLineItems.map(item => ({
    //   product_id: item.product_id,
    //   variant_id: item.variant_id,
    //   quantity: item.quantity,
    // }));

    const orderResponse = await fetch('https://api.printify.com/v1/shops/11876498/orders.json', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${printifyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    console.log('Printify API Response:', orderResponse.status, orderResponse.statusText);

    if (orderResponse.ok) {
      console.log('Order placed successfully with Printify.');
      res.status(200).json({ message: 'Order placed successfully with Printify' });
    } else {
      console.error('Failed to place order with Printify.');
      res.status(500).json({ error: 'Failed to place order with Printify' });
    }
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
});

app.use(apiProxy);
app.use(orderProxy);
app.use(blogProxy);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Proxy server running on PORT ${PORT}`);
});

//MAP API

const mapAPI = process.env.MAP_API || "MzZFMU1ZTGNKUUZRVjA1MG9ySXAzS1hoZEdUTlZpWEZDNjF5RXA2Qw=="



