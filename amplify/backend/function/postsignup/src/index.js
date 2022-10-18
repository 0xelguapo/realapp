/* Amplify Params - DO NOT EDIT
	API_REALAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_REALAPP_GRAPHQLAPIIDOUTPUT
	API_REALAPP_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */


import { default as fetch, Request } from "node-fetch";

const createClientQuery = /* GraphQL */ `
  mutation createClient($input: CreateClientInput!) {
    createClient(input: $input) {
      id
    }
  }
`;

const createConnectionHistoryQuery = /* GraphQL */ `
  mutation createConnectionHistory($input: CreateConnectionHistoryInput!) {
    createConnectionHistory(input: $input) {
      id
    }
  }
`;

const createReminderQuery = /* GraphQL */ `
  mutation createReminder($input: CreateReminderInput!) {
    createReminder(input: $input) {
      id
    }
  }
`;

const createTaskQuery = /* GraphQL */ `
  mutation createTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`;

const createNoteQuery = /* GraphQL */ `
  mutation createNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
    }
  }
`;

const createPropertyQuery = /* GraphQL */ `
  mutation createProperty($input: CreatePropertyInput!) {
    createProperty(input: $input) {
      id
    }
  }
`;


const GRAPHQL_APIKEY = process.env.API_REALAPP_GRAPHQLAPIKEYOUTPUT;
const GRAPHQL_ENDPOINT = process.env.API_REALAPP_GRAPHQLAPIENDPOINTOUTPUT;


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event, context, callback) => {
  /** @type {import('node-fetch').RequestInit} */

  //---- create client ----//
  let userId = event.request.userAttributes.sub;
  // let userId = "2612aa2f-e76d-4c3d-a077-2da27797313b"
  // let userId = "1283acf9-98cb-4582-b19e-52659493fe4f"

  const createClientVariables = { input: { firstName: "Jon Snow", lastName: "Sample", favorite: true, company: "CoAgent Team", phone: "3105558592,2125559912", email: "eric@coagent.co,emailMeAnytime@youremail.com", notes: "You can import your existing clients from an excel sheet or .csv on our website, https://coagent.co/", clientStreet: "5422 Nights Watch Blvd", clientState: "CA", clientCity: "Thrones", clientZip: "88228", owner: userId } };
  const createClientVariablesTwo = { input: { firstName: "First", lastName: "Contact", favorite: true, company: "CoAgent Team", phone: "1215552151,4245559421", email: "eric@coagent.co,emailMeAnytime@youremail.com", notes: "Welcome to your first contact! Browse around this screen and get a feel of things. Create reminders, log your call/connection histories, and set up tasks.", clientStreet: "54221 Jon Snow Avenue", clientState: "CA", clientCity: "Thrones", clientZip: "512142", owner: userId } };

  const createClientOptions = {
    method: "POST",
    headers: {
      'x-api-key': GRAPHQL_APIKEY
    },
    body: JSON.stringify({ query: createClientQuery, variables: createClientVariables }),
  };
  
  const createClientRequest = new Request(GRAPHQL_ENDPOINT, createClientOptions);

  let createClientStatusCode = 200;
  let createClientResponse;
  let createClientBody;

  try {
    createClientResponse = await fetch(createClientRequest);
    createClientBody = await createClientResponse.json()
  }
  catch (error) {
    createClientStatusCode = 400;
    createClientBody = {
      errors: [{
        status: createClientResponse.status,
        message: error.message,
        stack: error.stack
      }]
    };
    console.log(error);
  }
  
  let firstCreatedClientId = createClientBody.data.createClient.id;
  
  //  ---- create reminder for first client ---- //
  let date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(8);
  date.setMinutes(0);

  const createReminderVariables = {input: {clientId: firstCreatedClientId, date, owner: userId }}

  const createReminderOptions = {
    method: "POST",
    headers: {
      'x-api-key': GRAPHQL_APIKEY
    },
    body: JSON.stringify({ query: createReminderQuery, variables: createReminderVariables }),
  };

  const createReminderRequest = new Request(GRAPHQL_ENDPOINT, createReminderOptions);
  
  try {
    let createReminderResponse = await fetch(createReminderRequest)
  } catch (error) {
    console.log(error)
  }
  
  // ---- create connection history for first client ---- //
  const createConnectionHistoryVariables = {input: {title: 'Reached Cell Phone', date: date.toLocaleString(), clientId: firstCreatedClientId , owner: userId}}
  const createConnectionHistoryOptions = {
    method: "POST",
    headers: {
      'x-api-key': GRAPHQL_APIKEY
    },
    body: JSON.stringify({ query: createConnectionHistoryQuery, variables: createConnectionHistoryVariables }),
  }
  
  const createConnectionHistoryRequest = new Request(GRAPHQL_ENDPOINT, createConnectionHistoryOptions);
  try {
    await fetch(createConnectionHistoryRequest);
  } catch (error) {
    console.log(error)
  }
  

  // ----create task---- //
  
  const createTaskVariables = { input: {title: "You can set 'Reminders'", content: "Reminders notify you to reach out to a client. You can create a reminder via your clients!", date: date, clientId: firstCreatedClientId, owner: userId }}

  const createTaskOptions = {
    method: "POST",
    headers: {
      'x-api-key': GRAPHQL_APIKEY
    },
    body: JSON.stringify({ query: createTaskQuery, variables: createTaskVariables }),
  };

  const createTaskRequest = new Request(GRAPHQL_ENDPOINT, createTaskOptions);

  try {
    let createTaskResponse = await fetch(createTaskRequest)
    console.log('create task response',createTaskResponse)
  } catch(error) {
    console.log(error)
  }

  // ----create second client---- //
  const createSecondClientOptions = {
    ...createClientOptions,
    body: JSON.stringify({ query: createClientQuery, variables: { ...createClientVariablesTwo }})
  }

  
  const createSecondClientRequest = new Request(GRAPHQL_ENDPOINT, createSecondClientOptions)

  let createSecondClientResponse;
  let createSecondClientBody;
  let createSecondClientStatusCode = 200;
  let secondCreatedClientId;
  
  try {
    createSecondClientResponse = await fetch(createSecondClientRequest);
    createSecondClientBody = await createSecondClientResponse.json()
    secondCreatedClientId = createSecondClientBody.data.createClient.id
  }
  catch (error) {
    createSecondClientStatusCode = 400;
    createSecondClientBody = {
      errors: [{
        status: createSecondClientResponse.status,
        message: error.message,
        stack: error.stack
      }]
    };
    console.log(error);
  }
  
  // ---- create second connection history for second client ---- //
  
  const createSecondConnectionHistoryVariables = {input: {title: 'Left Voicemail (LVM)', date: date.toLocaleString(), clientId: secondCreatedClientId , owner: userId}}
  const createSecondConnectionHistoryOptions = {
    method: "POST",
    headers: {
      'x-api-key': GRAPHQL_APIKEY
    },
    body: JSON.stringify({ query: createConnectionHistoryQuery, variables: createSecondConnectionHistoryVariables }),
  }
  
  const createSecondConnectionHistoryRequest = new Request(GRAPHQL_ENDPOINT, createSecondConnectionHistoryOptions);
  try {
    await fetch(createSecondConnectionHistoryRequest);
  } catch (error) {
    console.log(error)
  }
  
  // --- create second task ---- //

  const createSecondTaskVariables = {input: {title: "Upload your existing clients", content: "You can upload your existing clients via excel sheet or .csv. Visit our website to start! https://coagent.co", date: date, clientId: secondCreatedClientId, owner: userId}}

  const createSecondTaskOptions = {
    ...createTaskOptions,
    body: JSON.stringify({ query: createTaskQuery, variables: createSecondTaskVariables })
  }

  const createSecondTaskRequest = new Request(GRAPHQL_ENDPOINT, createSecondTaskOptions)

  try {
    await fetch(createSecondTaskRequest)
  } catch (error) {
    console.log(error)
  }



  
// ---- create note ---- //

  const createNoteVariables = { input: {title: "Add a quick note here", content: "View all your groups and reminders above!", owner: userId }}

  const createNoteOptions = {
    method: "POST",
    headers: {
      'x-api-key': GRAPHQL_APIKEY
    },
    body: JSON.stringify({ query: createNoteQuery, variables: createNoteVariables }),
  };

  const createNoteRequest = new Request(GRAPHQL_ENDPOINT, createNoteOptions)
  
  try {
    await fetch(createNoteRequest)
  } catch (error) {
    console.log(error)
  }
  
  // ---- create property ---- //
  const createPropertyVariables = { input: {street: '12819 Kings Landing Blvd', city: 'Westeros', state: 'CA', zip: '90210', note: 'Planning on listing in the next few months dependent on market conditions. Mortgage is half paid off, already has a buyer profile in mind.', price: '5000000', clientId: firstCreatedClientId, owner: userId}}
  
  const createPropertyOptions = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_APIKEY
    },
    body: JSON.stringify({ query: createPropertyQuery, variables: createPropertyVariables })
  }
  
  const createPropertyRequest = new Request(GRAPHQL_ENDPOINT, createPropertyOptions);
  
  try {
    await fetch(createPropertyRequest);
  } catch (error) {
    console.log(error)
  }
  
  
  // ---- create second property ---- //
  const createSecondPropertyVariables = { input: { street: '94381 Braavos Street', city: 'City of Braavos', state: 'WE', zip: '19205', note: 'Retail investment property, ready to sell but she is unsure about market conditions. Cap rate estimated around 5.50%. ', price: '3000000', clientId: secondCreatedClientId, owner: userId}}
  
  const createSecondPropertyOptions = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_APIKEY
    },
    body: JSON.stringify({ query: createPropertyQuery, variables: createSecondPropertyVariables })
  };
  
  const createSecondPropertyRequest = new Request(GRAPHQL_ENDPOINT, createSecondPropertyOptions);
  
  try {
    await fetch(createSecondPropertyRequest)
  } catch (error) {
    console.log(error)
  }
  
  callback(null, event)

//   console.log(`EVENT: ${JSON.stringify(event)}`);
  return {
    statusCode: 200,
    body: JSON.stringify(createClientBody),
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
  };
};
