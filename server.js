// Import dependencies
const express = require("express");
const msal = require("@azure/msal-node");
const CONFIG = require('./config/config')
// Authentication parameters
const config = {
  auth: {
    clientId:CONFIG.CLIENT_ID,
    authority:`${CONFIG.CLOUD_INSTANCE}/${CONFIG.TENANT_ID}`
     ,
    clientSecret: `${CONFIG.CLIENT_SECRET}`,
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

const REDIRECT_URI = `${CONFIG.REDIRECT_URI}`;
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
      res.send({
        accessToken: response.accessToken,
        tokenType: "Bearer",
        expiresOn: response.expiresOn,
        extExpiresOn: response.extExpiresOn,
      });
    })
    .catch((error) => res.status(500).send(error));
});
app.listen(3000, () => console.log(`listening on port 3000!`));

