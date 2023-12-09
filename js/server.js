const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fetch = require('node-fetch'); // Ensure you've installed the 'node-fetch' package
require('dotenv').config();

const app = express();
const printifyApiKey = process.env.PRINTIFY_API_KEY 
const PORT = process.env.PORT || 5000; 

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
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Proxy server running on PORT ${PORT}`);
});




