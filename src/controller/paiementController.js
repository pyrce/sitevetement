const controller={}
var request = require('request');
// 1. Add your credentials:
// Add your client ID and secret
var CLIENT =
  'AWRCjsCR3x0TgeLHFqKOIS9D1SfW9mvht3Hm_EXiF3NNHkxpsH3F1QsJB88tyZhyFISaPdb65sTk2Ysb';
var SECRET =
  'EJdSAkPppJ5NShsut8q8rQzfgjxbxmN_k4eoJFkPLMbjJXhmcZ43L5l2wyiSYBsmRN4-SJ2XqYMX-X5H';
var PAYPAL_API = 'https://api.sandbox.paypal.com';
var bearer="";
/** Fonction qui réccupere le token d'identification 
  * @param req requete utilisateur
  * @param res reponnse serveur 
*/
controller.login= (req, res) => {
    var options = {
        'method': 'POST',
        'url': PAYPAL_API+'/v1/oauth2/token',
        'headers': {
          'Authorization': 'Basic QVdSQ2pzQ1IzeDBUZ2VMSEZxS09JUzlEMVNmVzltdmh0M0htX0VYaUYzTk5Ia3hwc0gzRjFRc0pCODh0eVpoeUZJU2FQZGI2NXNUazJZc2I6RUpkU0FrUHBwSjVOU2hzdXQ4cThyUXpmZ2p4YnhtTl9rNGVvSkZrUExNYmpKWGhtY1o0M0w1bDJ3eWlTWUJzbVJONC1TSjJYcVlNWC1YNUg=',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
          'grant_type': 'client_credentials'
        }
      };
      request(options, function (error, response) { 
        if (error) throw new Error(error);
   bearer=response.body.access_token;
      });
}

controller.createpaiement= (req, res) => {
console.log("paiement")
if(bearer=="") res.redirect("/my-api/login");else{
var options = {
    'method': 'POST',
    'url': PAYPAL_API+'/v1/payments/payment',
    'headers': {
      'Bearer': bearer,
      'Authorization': 'Basic QVZ6TDlDSlMxeXhYRlZqVUpuTGZwSXZuSDI0dzNya3RwU2Q0c1RqSS10bHc1UUFLUVp3Tlp5OEtTa0lTbG4yeURGUXN5djdzbTlPX0lPTXk6RUpmVDd2N3ZUczBRMnJzOVVENExLZmgwb29GNnNXVWZ5Y2ZISTYwMkhyS0QxTFgwTDQ5WF84cWpJck1GYUVKSTVCcGp0ME9pYk1GYTJHQms=',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"intent":"sale","payer":{"payment_method":"paypal"},"transactions":[{"amount":{"total":"5.99","currency":"USD"}}],"redirect_urls":{"return_url":"/","cancel_url":"/"}})
  
  };
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
  });
}
  }

  controller.executepaiement=(req,res)=>{
        // 6. Get the payment ID and the payer ID from the request body.
        
    var paymentID = req.body.paymentID;
    var payerID = req.body.payerID;
    // 7. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
      '/execute',
      {
        auth:
        {
          user: CLIENT,
          pass: SECRET
        },
        body:
        {
          payer_id: payerID,
          transactions: [
          {
            amount:
            {
              total: '10.99',
              currency: 'USD'
            }
          }]
        },
        json: true
      },
      function(err, response)
      {
        if (err)
        {
          console.error(err);
          return res.sendStatus(500);
        }
        // 8. Return a success response to the client
        res.json(
        {
          status: 'success'
        });
      });
  }


module.exports = controller;