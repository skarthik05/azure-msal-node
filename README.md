# azure-msal-node
---
languages:
- javascript
- nodejs
---
## Features
This sample demonstrates the following MSAL Node concepts:

- Configuration
- Login
- Acquiring an access token

## Getting Started

### Prerequisites

[Node.js](https://nodejs.org/en/) must be installed to run this sample.

### Setup

1. Register a new application by following the steps shown [here](https://docs.microsoft.com/azure/active-directory/develop/web-app-quickstart?pivots=devlang-nodejs-msal#step-1-register-your-application)
2. Clone this repository `git clone https://github.com/skarthik05/azure-msal-node.git`
3. Open the [.env](.env) file and provide the required configuration values
4. On the command line, navigate to the `azure-msal-node` folder, and run`npm install` to install the project dependencies via npm

## Running the sample

1. Configure authentication and authorization parameters:
   1. Open `.env`
   2. Replace the string `"Enter_the_Application_Id_Here"` with your app/client ID on AAD Portal.
   3. Replace the string `"Enter_the_Cloud_Instance_Id_Here"` with `"https://login.microsoftonline.com"`
   4. Replace the string `"Enter_the_Tenant_Info_Here"` with your tenant ID on AAD Portal.
   5. Replace the string `"Enter_the_Client_Secret_Here"` with your client secret on AAD Portal.
   6. Replace the string `"Enter_the_Client_Redirect_URL"` with your Redirect URL on AAD Portal.
2. To start the sample application, run `npm start`.
3. Finally, open a browser and navigate to [http://localhost:3000/auth](http://localhost:3000/auth).