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

const createReminderQuery = /* GraphQL */ `
  mutation createReminder($input: CreateReminderInput!) {
    createReminder(input: $input) {
      id
    }
  }
`;

const createTaskQuery = /* GraphQL */ `
  mutation createTask($input: createTaskInput!) {
    createTask(input: $input) {
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
  // let userId = event.request.userAttributes.sub;
  let userId = "79c4f9f2-9848-4ca3-b2e4-884484ae5c97"

  const createClientVariables = { input: { firstName: "Sample", lastName: "Contact", favorite: true, company: "CoAgent Team", phone: "3105558592, 2125559912", email: "eric@coagent.co,emailMeAnytime@youremail.com", notes: "You can import your existing clients from an excel sheet or .csv on our website, https://coagent.co/", clientStreet: "5422 Kings Landing Blvd", clientState: "CA", clientCity: "Thrones", clientZip: "88228", owner: userId } };
  const createClientVariablesTwo = { input: { firstName: "First", lastName: "Contact", favorite: true, company: "CoAgent Team", phone: "1215552151, 4245559421", email: "eric@coagent.co,emailMeAnytime@youremail.com", notes: "Welcome to your first contact! Browse around this screen and get a feel of things. Create reminders, log your call/connection histories, and set up tasks.", clientStreet: "54221 Jon Snow Avenue", clientState: "CA", clientCity: "Thrones", clientZip: "512142", owner: userId } };

  const createClientOptions = {
    method: "POST",
    headers: {
      'x-api-key': GRAPHQL_APIKEY
    },
    body: JSON.stringify({ query: createClientQuery, variables: createClientVariables }),
  };
  
  const createSecondClientOptions = {
    ...createClientOptions,
    body: JSON.stringify({ query: createClientQuery, variables: { ...createClientVariablesTwo }})
  }

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

  //  ---- create reminder for above client ---- //
  let firstCreatedClientId = createClientBody.data.createClient.id;
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

  // ----create a task---- //
  
  const createTaskVariables = { input: {title: "Set Reminders to contact client", content: "Reminders send you notifications when you need to follow up or reach out to a client", owner: userId }}

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

  // --- create second task ---- //

//   const createSecondTaskVariables = {input: {title: "Tasks are tracked here", content: "Click the + button to start marking tasks!", owner: userId}}

//   const createSecondTaskOptions = {
//     ...createTaskOptions,
//     body: JSON.stringify({ query: createTaskQuery, variables: createSecondTaskVariables })
//   }

//   const createSecondTaskRequest = new Request(GRAPHQL_ENDPOINT, createSecondTaskOptions)

//   try {
//     await fetch(createSecondTaskRequest)
//   } catch (error) {
//     console.log(error)
//   }


  // ----create second client---- //
  
  const createSecondClientRequest = new Request(GRAPHQL_ENDPOINT, createSecondClientOptions)

  let createSecondClientResponse;
  let createSecondClientBody;
  let createSecondClientStatusCode = 200;
  
  try {
    createSecondClientResponse = await fetch(createSecondClientRequest);
    createSecondClientBody = await createSecondClientResponse.json()
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
