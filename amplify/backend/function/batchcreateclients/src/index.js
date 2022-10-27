/* Amplify Params - DO NOT EDIT
	API_REALAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_REALAPP_GRAPHQLAPIIDOUTPUT
	API_REALAPP_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT *//*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["GRAPHQL_API_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/


import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

import { default as fetch, Request } from "node-fetch";
const aws = require('aws-sdk')

const GRAPHQL_ENDPOINT = process.env.API_REALAPP_GRAPHQLAPIENDPOINTOUTPUT


// const { Parameters } = await (new aws.SSM())
//   .getParameters({
//     Names: ["GRAPHQL_API_KEY"].map(secretName => process.env[secretName]),
//     WithDecryption: true,
//   })
//   .promise();

const clientMutationQuery = /* GraphQL */ `
  mutation createClient($input: CreateClientInput!) {
    createClient(input: $input) {
      firstName
    }
  }
`;
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 
   const DUMMY_DATA = [
  ['First Name', 'Last Name', 'company', 'email', 'phone', 'Address', 'City', 'State', 'Zip Code'],
  ['Lambert', 'Beckhouse', 'StackOverflow', 'lbeckhouse0@stackoverflow.com', '512-555-1738', '316 Arapahoe Way', 'Austin', 'TX', '78721'],
  ['Maryanna', 'Vassman', 'CDBABY', 'mvassman1@cdbaby.com', '479-204-8976', '1126 Troy Way', 'Fort Smith', 'AR', '72916']
  ]

  const MAPPED_FIELDS = ['firstName', 'lastName', 'company', 'email', 'phone', null, null, null, 'clientZip']

export const handler = async (event) => {
  /** @type {import('node-fetch').RequestInit} */
  // console.log(`EVENT: ${JSON.stringify(event)}`);
  const {data, mappedFields} = event.arguments;
  let userId = event.identity.claims.sub;
  // let userId = "1283acf9-98cb-4582-b19e-52659493fe4f"

  //all client fields will be smaller than or equal to index 8.
  const clientObjectsToUpload = data.slice(1).map((data) =>
    Object.fromEntries(
      mappedFields.map((key, idx) => {
        if (idx <= 8) return [key, data[idx]];
        else return [null, null];
      }).filter((a) => a[0])
    )
  );
  
  console.log(clientObjectsToUpload)
  //   const propertyObjectsToUpload = DUMMY_DATA.slice(1).map((data) =>
  //   Object.fromEntries(
  //     MAPPED_FIELDS.map((key, idx) => {
  //       if (idx > 8) return [key, data[idx]];
  //       else return [null, null];
  //     }).filter((a) => a[0])
  //   )
  // );
  
  const options = clientObjectsToUpload.map((clientObj, index) => {
    const variables = { input: {...clientObj, owner: userId }}
    const option = {
      method: "POST",
      headers: {
        'x-api-key': process.env.API_REALAPP_GRAPHQLAPIKEYOUTPUT
      },
      body: JSON.stringify({ query: clientMutationQuery, variables: variables })
    }
    return option
  })
  
  const requests = options.map((option, index) => {
    let request = new Request(GRAPHQL_ENDPOINT, option)
    return fetch(request)
  })
  
  // const options = {
  //   method: "POST",
  //   headers: {
  //     'x-api-key': process.env.API_REALAPP_GRAPHQLAPIKEYOUTPUT
  //   },
  //   body: JSON.stringify({ query, variables }),
  // };

  // const request = new Request(GRAPHQL_ENDPOINT, options);

  let statusCode = 200;
  let body; 
  let response;
  
  try {
      response = await Promise.all(requests)
      console.log(response)
      // body = await response.json()
  //   response = await fetch(request);
  //   body = await response.json()
    if(body.errors) statusCode = 400;
  } catch (error) {
    console.log(error)
    statusCode = 400;
    body = {
      errors: [
        {
          status: response.status,
          message: error.message,
          stack: error.stack
        }
        ]
    }
  }

  return {
    statusCode,
    body: JSON.stringify(body)
    // body: JSON.stringify(data),
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
  };
};


