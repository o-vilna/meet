"use strict";

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.public.readonly",
  "https://www.googleapis.com/auth/calendar.events",
];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ["https://meet-brown.vercel.app"];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

module.exports.getAuthURL = async () => {
  try {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify({ authUrl }),
    };
  } catch (error) {
    console.error("Error generating auth URL:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports.getAccessToken = async (event) => {
  console.log("Event received:", JSON.stringify(event, null, 2));

  try {
    const code = decodeURIComponent(event.pathParameters.code);
    console.log("Decoded authorization code:", code);

    console.log("OAuth2Client config:", {
      clientId: CLIENT_ID,
      redirectUri: redirect_uris[0],
    });

    const response = await new Promise((resolve, reject) => {
      oAuth2Client.getToken(code, (error, response) => {
        if (error) {
          console.error("OAuth2Client.getToken error:", error);
          reject(error);
        } else {
          console.log(
            "OAuth2Client.getToken response:",
            JSON.stringify(response, null, 2)
          );
          oAuth2Client.setCredentials(response);
          resolve(response);
        }
      });
    });

    console.log("Final response object:", JSON.stringify(response, null, 2));

    const finalResponse = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    };

    console.log("Sending response:", JSON.stringify(finalResponse, null, 2));
    return finalResponse;
  } catch (error) {
    console.error("Error in getAccessToken:", {
      message: error.message,
      stack: error.stack,
      error: error,
    });

    const errorResponse = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: true,
        message: error.message,
        details: error.stack,
      }),
    };

    console.log(
      "Sending error response:",
      JSON.stringify(errorResponse, null, 2)
    );
    return errorResponse;
  }
};

module.exports.getCalendarEvents = async (event) => {
  try {
    const access_token = decodeURIComponent(event.pathParameters.access_token);
    oAuth2Client.setCredentials({ access_token });

    const results = await new Promise((resolve, reject) => {
      calendar.events.list(
        {
          calendarId: CALENDAR_ID,
          auth: oAuth2Client,
          timeMin: new Date().toISOString(),
          singleEvents: true,
          orderBy: "startTime",
        },
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ events: results.data.items }),
    };
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
