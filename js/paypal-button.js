// paypal-button.js

// document.addEventListener('DOMContentLoaded', function () {
//     document.addEventListener('updateTotalEvent', function (event) {
//         const updatedTotal = event.detail.total;
//         // console.log('Updated total in paypal-button.js:', updatedTotal);
//       });
    
//     // Your PayPal button configuration
//     // paypal.Buttons({
//     //   createOrder: function (data, actions) {
//     //     // Set up the transaction when the button is clicked
//     //     return actions.order.create({
//     //       purchase_units: [
//     //         {
//     //           amount: {
//     //             value: updateTotal().toString(), // Use the function to get the most recent total
//     //           },
//     //         },
//     //       ],
//     //     });
//     //   },
//     //   onApprove: function (data, actions) {
//     //     // Capture the funds when the buyer approves the payment
//     //     return actions.order.capture().then(function (details) {
//     //       // Show a success message
//     //       alert('Transaction completed by ' + details.payer.name.given_name);
//     //     });
//     //   },
//     // });
  
//     // Listen for the custom event to update the total
//     // console.log('this is the ', updateTotal().toString());
//   });
  
  