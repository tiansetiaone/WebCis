// pages/api/dialogflow.js
const { SessionsClient } = require('@google-cloud/dialogflow');

// Konfigurasi credentials
const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const dialogflowClient = new SessionsClient({
      credentials,
      projectId: process.env.DIALOGFLOW_PROJECT_ID
    });

    const sessionPath = dialogflowClient.projectAgentSessionPath(
      process.env.DIALOGFLOW_PROJECT_ID,
      req.body.sessionId || 'default-session'
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: req.body.query,
          languageCode: 'id',
        },
      },
    };

    const [response] = await dialogflowClient.detectIntent(request);
    
    res.status(200).json({
      fulfillmentText: response.queryResult.fulfillmentText,
      intent: response.queryResult.intent?.displayName
    });
  } catch (error) {
    console.error('Dialogflow Error:', error);
    res.status(500).json({ 
      error: 'Error processing your request',
      details: error.message 
    });
  }
}