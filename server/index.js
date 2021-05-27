// const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { RepeatOneSharp } = require("@material-ui/icons");
const stripe = require("stripe")(
  "sk_test_51IudGeSAc1cEiR3r8cTBj0R7l2Vip6yz1fCPYcdG1eZYZaiAWwKePwcdd9ygWAVgMR1rXmrlIpzNt9KC7elJyoy100dgxZBDBJ"
);

// API
const PORT = process.env.PORT || 3001;

// App config
const app = express();

//  middleware
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("payment request for amt", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

// http://localhost:5001/fir-9080e/us-central1/api
//  Listen command
// exports.api = functions.https.onRequest(app);
