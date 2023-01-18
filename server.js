// Import dependencies
const express = require("express");
const msal = require("@azure/msal-node");
require("dotenv").config();

// Authentication parameters
const config = {
  auth: {
    clientId:process.env.CLIENT_ID,
    authority:`${process.env.CLOUD_INSTANCE}/${process.env.TENANT_ID}`
     ,
    clientSecret: `${process.env.CLIENT_SECRET}`,
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

const REDIRECT_URI = `${process.env.REDIRECT_URI}`;
// Initialize MSAL Node object using authentication parameters
const cca = new msal.ConfidentialClientApplication(config);

// Initialize express
const app = express();
app.get("/auth", (req, res) => {
  // Construct a request object for auth code
  const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri: REDIRECT_URI,
  };

  // Request auth code, then redirect
  cca
    .getAuthCodeUrl(authCodeUrlParameters)
    .then((response) => {
      res.redirect(response);
    })
    .catch((error) => res.send(error));
});

app.get("/redirect", (req, res) => {
  // Use the auth code in redirect request to construct
  // a token request object
  const tokenRequest = {
    code: req.query.code,
    scopes: ["user.read"],
    redirectUri: REDIRECT_URI,
  };

  // Exchange the auth code for tokens
  cca
    .acquireTokenByCode(tokenRequest)
    .then((response) => {
        // return res.send(response)
      res.send({
        accessToken: response.accessToken,
        tokenType: "Bearer",
        expires_in: response.expiresOn,
        extExpiresOn: response.expiresOn,
      });
    })
    .catch((error) => res.status(500).send(error));
});
app.listen(3000, () => console.log(`listening on port 3000!`));

