var mqtt = require('mqtt');
var settings = require('../appsettings')

var noble = require('noble');



module.exports = class BLE_NOBLE{

  constructor(scannerDevice){
    this.people = 0;
    this.clientId = scannerDevice.clientId;
    this.topic = scannerDevice.topic;
    this.topicDesc = scannerDevice.topicDesc;
    this.clientSettings = {
      port: scannerDevice.port
    }
    this.startScanner();
  }


  startScanner(){
    var self = this;

    var mqttClient = mqtt.connect(settings.mqttBrokerUrl, { clientId: this.clientId });
    
    mqttClient.publish(self.topic, 
      JSON.stringify({ clientId: self.clientId, topic: self.topic, topicDesc: self.topicDesc, people: 0, date: Date.now(), port: self.clientSettings.port })
    );

    console.log(Date() + ' ' + self.clientId + ' [NOBLE]: ' + self.topic + ' is running...');

    
    //__ - NOBLE - ________________________________________
    // var RSSI_THRESHOLD    = -90; //in order to deevelop the range-limit version system
    var EXIT_GRACE_PERIOD = 5000; // milliseconds
    var inRange = [];

    noble.on('discover', function(peripheral) {
      var id = peripheral.id;
      var entered = !inRange[id];

      if (entered) {
        inRange[id] = {
          peripheral: peripheral
        };

        console.log('"' + peripheral.advertisement.localName + '" entered (RSSI ' + peripheral.rssi + ') ' + new Date());
        mqttClient.publish(self.topic, JSON.stringify({ clientId: self.clientId, topic: self.topic, topicDesc: self.topicDesc, people: (++self.people), date: Date.now() }));
        console.log(self.topic + 'DISCOVER')
        
      }

      inRange[id].lastSeen = Date.now();
    });

    // -- update the peripherals inside the range
    setInterval(function() {
      for (var id in inRange) {
        if (inRange[id].lastSeen < (Date.now() - EXIT_GRACE_PERIOD)) {
          var peripheral = inRange[id].peripheral;

          console.log('"' + peripheral.advertisement.localName + '" exited (RSSI ' + peripheral.rssi + ') ' + new Date());
          delete inRange[id];
          mqttClient.publish(self.topic, JSON.stringify({ clientId: self.clientId, topic: self.topic, topicDesc: self.topicDesc, people: (self.people ? --self.people : 0), date: Date.now() }));
          console.log('exit')
          
        }
      }
    }, EXIT_GRACE_PERIOD / 2);

    noble.on('stateChange', function(state) {
      if (state === 'poweredOn') {
        noble.startScanning([], true);
      } else {
        noble.stopScanning();
      }
    });
    //__ - END NOBLE - ________________________________________

  }
  
}