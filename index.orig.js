var awsIot = require('aws-iot-device-sdk');
var Player = require('player')

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourAWSRegion>'
// with a unique client identifier and the AWS region you created your
// certificate in (e.g. 'us-east-1').  NOTE: client identifiers must be
// unique within your AWS account; if a client attempts to connect with a
// client identifier which is already in use, the existing connection will
// be terminated.
//
var device = awsIot.device({
  "host": "a24i2l4jspygxo.iot.us-east-1.amazonaws.com",
  "port": 8883,
  "clientId": "soundreceiver",
  "thingName": "soundreceiver",
  "caCert": "certificates/root-CA.crt",
  "clientCert": "certificates/5a489ac132-certificate.pem.crt",
  "privateKey": "certificates/5a489ac132-private.pem.key"
});

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
var player = new Player('https://s3.amazonaws.com/iot-audioclips/fart-01.mp3');

player.on('error', function(err) {
  console.log(JSON.stringify(err, null, 2))
})

  .on('playing', function(song) {
    console.log('I\'m playing... ');
  })
  .on('playend', function(song) {
    console.log('Play done, Switching to next one ...');
  })

device
.on('connect', function() {
console.log('connected')
  device.subscribe('bringthenoise');
});

device
.on('message', function(topic, payload) {
  console.log('triggered')
  player.play()

});
