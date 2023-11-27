// paypal-button.js

document.addEventListener('DOMContentLoaded', function () {
    // Your PayPal button configuration
    paypal.Buttons({
      createOrder: function (data, actions) {
        // Set up the transaction when the button is clicked
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: '10.00', // Replace with your actual amount
              },
            },
          ],
        });
      },
      onApprove: function (data, actions) {
        // Capture the funds when the buyer approves the payment
        return actions.order.capture().then(function (details) {
          // Show a success message
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      },
    })
    // .render('#paypal-button-container'); // Render the button in the specified container
  });
  