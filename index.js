/** 
 * Configuration for the WEB RTC peer server.
 */
const config = {
  
  port: 8080

};


const express = require('express');
const peerServer = require('peer').PeerServer;
const app = express();
const webSocket = require('ws');


/** 
 * Handle requests to the web interfaces, to show
 * the video feed, and allow the client RTC libary
 * to send in the case of sender.
 * 
 */
app.get('/client', (req, res) => {
  res.sendFile(`${__dirname}/client/client.html`);
});
app.get('/sender', (req, res) => {
  res.sendFile(`${__dirname}/sender/sender.html`);
});

// Serve the frontend js for the client / server apps.
app.use(express.static('lib'));

/** 
 * Function used to generate a custom ClientID for
 * each connection.
 * 
 * @return {String} The generated clientID.
 * 
 */
function generateClientId() {
  return (Math.random().toString(36) + '0000000000000000000').substr(2, 16);
}

const peer = new peerServer({
  debug: true,
  host: 'localhost',
  port: 9000,
  path: '/app'
});

peer.on('connection', function() {
  console.log('connected!');
});

// Start express.
app.listen(config.port, () => { console.log(`Ready on :${config.port}`) });


