const axios = require("axios");
const { ApiError, Client, Environment } = require("square");

// Have to use Server side to send POST request for Square API
export default async function handler(req, res) {
  if (req.method === "GET") {
    let environment = Environment.Sandbox;
    const squareClient = new Client({
      environment: environment,
    });

    const oauthInstance = squareClient.oAuthApi;

    try {
      let { result } = await oauthInstance.obtainToken({
        // Provide the code in a request to the Obtain Token endpoint
        code: req.body.code,
        clientId: process.env.NEXT_PUBLIC_SQ_APPLICATION_ID,
        clientSecret: process.env.NEXT_PUBLIC_SQ_APPLICATION_SECRET,
        grantType: "authorization_code",
      });

      let {
        // Extract the returned access token from the ObtainTokenResponse object
        accessToken,
        refreshToken,
        expiresAt,
        merchantId,
      } = result;

      res
        .status(201)
        .json({ accessToken, refreshToken, expiresAt, merchantId });
    } catch (err) {
      res.status(201).json(err);
    }
  }
}
