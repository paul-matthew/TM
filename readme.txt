Thank you for using our template!

For more awesome templates please visit https://colorlib.com/wp/templates/

Copyright information for the template can't be altered/removed unless you purchase a license.
More information about the license is available here: https://colorlib.com/wp/licence/

Removing copyright information without the license will result in suspension of your hosting and/or domain name(s).

**Server**
The client-side (APIs.js) communicates with the server (server.js), which in turn interacts with third-party services via APIs. 
These third parties include Paypal, Printify, Datocms (for the blog), and CountryStateCity (for shipping location validation). 
All API keys are stored securely in the .env file locally and configured in the server host settings. 
Before starting the server, ensure all dependencies are installed by running npm install. 
To start the server, navigate to cd js and run npm start.

**Error Handling**
The server includes robust error handling mechanisms to catch and respond to errors appropriately. 
An error handling middleware (errorHandler) is implemented to ensure smooth operation even in the event of unexpected errors.

**Proxy Middleware**
Proxy middleware is utilized in the server to redirect requests to third-party APIs. 
Endpoints such as /products, /orders, /blogs, /maps/regions, /maps/cities, and /config are configured to interact with specific third-party services. 
This middleware streamlines communication with external APIs and enhances the server's performance.

**Environment Variables**
Sensitive information, such as API keys, is securely managed using environment variables. 
It's essential to set up these variables correctly in the .env file and server host configuration (ie. heroku config) to maintain the security of the system.

**API Endpoints - refer to APIs.js and server.js**
A list of available API endpoints and their functionalities:
/products: Interacts with the Printify API to fetch and manage product data.
/orders: Handles order processing and communication with the Printify API for order fulfillment.
/blogs: Retrieves and manages blog content using the Datocms headless CMS.
/maps/regions: Provides validation for shipping locations by fetching region data from the CountryStateCity API.
/maps/cities: Fetches city data for shipping location validation from the CountryStateCity API.
/config: Provides configuration details, including PayPal client ID, for integration with the PayPal API.

These endpoints enable seamless interaction with the server and facilitate various functionalities within the application.

**BLOG**
Utilizes www.datocms.com as a headless CMS for managing blog content.

**3D Model**
Use model.js to configure settings of 3D model

**Prinity**
Printify operates on a Print-on-Demand model. 
Customers make purchases via separate sales channels, such as PayPal. 
Once the server validates the received payment, an order is triggered on Printify's platform. 
Ensure to update the server with the live API token when transitioning between test and production accounts.

**Paypal**
Functions as a sales channel. 
Remember to update the server with the live API token when switching between sandbox and live environments.

**CountryStateCity (Shipping Location Validation)**
Employs an open-source tool to validate regions and cities. 
Countries are hardcoded as CA, TT, and US, utilizing ISO naming conventions for registration purposes.