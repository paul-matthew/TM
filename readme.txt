Thank you for using our template!

For more awesome templates please visit https://colorlib.com/wp/templates/

Copyright information for the template can't be altered/removed unless you purchase a license.
More information about the license is available here: https://colorlib.com/wp/licence/

Removing copyright information without the license will result in suspension of your hosting and/or domain name(s).

**Server**
The client side (APIs.js) communicates with the server (server.js) and the server communicates with the third parties via API.  The third parties include Paypal, Printify, Datocms (Blog) and CountryStateCity (Shipping Location Validation).
All API keys held in .env file (local) and in the server host configuration settings.
To start server go to cd js > npm start

**BLOG**
Uses www.datocms.com as a headless CMS

**3D Model**
Use model.js to configure settings of 3D model

**Prinity**
Printify uses a Print on Demand Model.  The customer purchases the product via a separate sales channel (in this case PayPal), and then once the payment is received and validated by the server then an order is triggered to printify.
Must update server with live api token when switching between test account and actual platform

**Paypal**
Sales channel.
Must update server with live api token when switching between sandox to live

**CountryStateCity (Shipping Location Validation)**
Open source tool to validate region and city. Countryies have been hard coded as CA, TT, US.  Countries and Regions uses ISO naming convention in order register