// -- floor zero
const entranceTopic = "groundFloor/entrance";
const exitTopic = "groundFloor/exit";
// -- floor 1
const firstFloorOfficeTopic = "firstFloor/office100";
const firstFloorBathTopic = "firstFloor/bath100";
// -- floor 2 
const secondFloorOfficeTopic = "secondFloor/office200";
const secondFloorBathTopic = "secondFloor/bath200";
// -- DB
const dbEmittersCollection = 'emitters';
const dbDataCollection = 'data';


const emitterValues = [
  {
    clientId: 'emitter-1',
  },
  {
    clientId: 'emitter-2',
  },
  {
    clientId: 'emitter-3',
  },
  {
    clientId: 'emitter-4',
  },
  {
    clientId: 'emitter-5',
  },
  {
    clientId: 'emitter-6',
  },
  {
    clientId: 'emitter-7',
  }
]


const scannerValues = [
  {
    clientId: 'scanner-entrance',
    topic: entranceTopic,
    topicDesc: "Entrance at ground floor",
    people: 0,
    port: 1880
  },
  {
    clientId: 'scanner-exit',
    topic: exitTopic,
    topicDesc: "Exit at ground floor",
    people: 0,
    port: 1881
  },
  {
    clientId: 'scanner-Room100',
    topic: firstFloorOfficeTopic,
    topicDesc: "Office at first floor",
    people: 0,
    port: 1882
  },
  {
    clientId: 'scanner-Bath100',
    topic: firstFloorBathTopic,
    topicDesc: "Bathroom at first floor",
    people: 0,
    port: 1883
  }
]



module.exports = {
  dbEmittersCollection: dbEmittersCollection,
  dbDataCollection: dbDataCollection,
  emitterValues: emitterValues,
  scannerValues: scannerValues,

  webUrl: 'ws://127.0.0.1:8080/',
  mqttUrl: 'mqtt://127.0.0.1/',
  mqttBrokerUrl: 'mqtt://test.mosquitto.org',
  dbUrl: 'mongodb://localhost:27017/',
  dbName: 'IoT-DB',
  datasetSize: 10,
  // -- important settings: THRESHOLD
  nobleEntrancePeopleLimit: 1,
  ExitPeopleLimit: 1,
  OfficeFirstFloorPeopleLimit: 1,
  BathFirstFloorPeopleLimit: 1,

  // -- EMITTER RefreshMs
  personRefreshMs: 10000,
  dataRefreshMs: 3000,
  
  entranceTopic: entranceTopic,
  exitTopic: exitTopic,
  firstFloorOfficeTopic: firstFloorOfficeTopic,
  firstFloorBathTopic: firstFloorBathTopic,
  secondFloorOfficeTopic: secondFloorOfficeTopic,
  secondFloorBathTopic: secondFloorBathTopic,
  rooms: [entranceTopic, exitTopic, firstFloorBathTopic, firstFloorOfficeTopic, secondFloorBathTopic, secondFloorOfficeTopic],

  serverSettings: {
    port: 1900
  },   
  scannerController: 'scanner',
  dataController: 'data',
  clientSettings: {}
}