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
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImIxN2I1YzVlOWUyODNlOTU3ZmRjOGRjYjQyZDlhZmU0Y2E3NjdlN2I3ZDJlOTk4Y2JlMTZlNTljNWU3ZDgyNGYyOTY0OWYwMmIzOGNjZTk4IiwiaWF0IjoxNjk5MjExNDY5LjY4NzE1MSwibmJmIjoxNjk5MjExNDY5LjY4NzE1NSwiZXhwIjoxNzMwODMzODY5LjY4MDE5Niwic3ViIjoiMTUzMTA4ODgiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.AR2sh86rYQVIjvW_wG8PbgH8PpEh_hntQEWs6K2R0Y4tcO7NpMoeIhL3qDb9j6s3yoJ8NClMdYk-zc4cK8k', 
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

//Order

app.post('/order-processing', async (req, res) => {
  try {
    // Log the order details received in the request body
    console.log('Received order details for processing:', req.body);

    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      province,
      city,
      address,
      zip,
    } = req.body.address_to;

    // Assuming selectedSKUs is an array of SKU strings
    const lineItems = req.body.line_items.map(item => ({
      product_id: item.product_id,
      variant_id: item.variant_id,
      quantity: item.quantity,
    }));

    const externalId = generateRandom6DigitNumber();
    // Order an existing product with Printify
    const orderResponse = await fetch('https://api.printify.com/v1/shops/11876498/orders.json', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImIxN2I1YzVlOWUyODNlOTU3ZmRjOGRjYjQyZDlhZmU0Y2E3NjdlN2I3ZDJlOTk4Y2JlMTZlNTljNWU3ZDgyNGYyOTY0OWYwMmIzOGNjZTk4IiwiaWF0IjoxNjk5MjExNDY5LjY4NzE1MSwibmJmIjoxNjk5MjExNDY5LjY4NzE1NSwiZXhwIjoxNzMwODMzODY5LjY4MDE5Niwic3ViIjoiMTUzMTA4ODgiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.AR2sh86rYQVIjvW_wG8PbgH8PpEh_hntQEWs6K2R0Y4tcO7NpMoeIhL3qDb9j6s3yoJ8NClMdYk-zc4cK8k',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        external_id: externalId.toString(),
        label: 'YOUR_ORDER_LABEL',
        line_items: lineItems,
        shipping_method: 1,
        is_printify_express: false,
        send_shipping_notification: false,
        address_to: {
          first_name: firstName,
          last_name: lastName,
          email:email,
          phone:phone,
          country:country,
          province:province,
          city:city,
          address1: address,
          zip:zip,
        },
      }),
    });

    if (orderResponse.ok) {
      console.log('Order placed successfully with Printify.');
      // You can implement further actions based on Printify's response
      // For example, show a success message, redirect to a thank-you page, etc.
      res.status(200).json({ message: 'Order placed successfully with Printify' });
    } else {
      console.error('Failed to place order with Printify.');
      res.status(500).json({ error: 'Failed to place order with Printify' });
    }
  } catch (error) {
    // Handle any errors that occur during order processing
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
});

