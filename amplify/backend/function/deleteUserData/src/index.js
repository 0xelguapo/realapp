/* Amplify Params - DO NOT EDIT
	API_REALAPP_CLIENTGROUPTABLE_ARN
	API_REALAPP_CLIENTGROUPTABLE_NAME
	API_REALAPP_CLIENTTABLE_ARN
	API_REALAPP_CLIENTTABLE_NAME
	API_REALAPP_CONNECTIONHISTORYTABLE_ARN
	API_REALAPP_CONNECTIONHISTORYTABLE_NAME
	API_REALAPP_GRAPHQLAPIIDOUTPUT
	API_REALAPP_NOTETABLE_ARN
	API_REALAPP_NOTETABLE_NAME
	API_REALAPP_PROPERTYGROUPTABLE_ARN
	API_REALAPP_PROPERTYGROUPTABLE_NAME
	API_REALAPP_PROPERTYTABLE_ARN
	API_REALAPP_PROPERTYTABLE_NAME
	API_REALAPP_REMINDERTABLE_ARN
	API_REALAPP_REMINDERTABLE_NAME
	API_REALAPP_TASKTABLE_ARN
	API_REALAPP_TASKTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const clientTableName = process.env.API_REALAPP_CLIENTTABLE_NAME;
const clientGroupTableName = process.env.API_REALAPP_CLIENTGROUPTABLE_NAME;
const propertyTableName = process.env.API_REALAPP_PROPERTYTABLE_NAME;
const connectionHistoryTableName =
  process.env.API_REALAPP_CONNECTIONHISTORYTABLE_NAME;
const noteTableName = process.env.API_REALAPP_NOTETABLE_NAME;
const propertyGroupTableName = process.env.API_REALAPP_PROPERTYGROUPTABLE_NAME;
const reminderTableName = process.env.API_REALAPP_REMINDERTABLE_NAME;
const taskTableName = process.env.API_REALAPP_TASKTABLE_NAME;

const allTableNames = [
  clientTableName,
  clientGroupTableName,
  propertyTableName,
  connectionHistoryTableName,
  noteTableName,
  propertyGroupTableName,
  reminderTableName,
  taskTableName,
];

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const ownerField = "owner";
  const identityClaim = "sub";

  let condition = {};
  condition[ownerField] = {
    ComparisonOperator: "EQ",
  };

  condition[ownerField]["AttributeValueList"] = [
    event.identity.claims[identityClaim],
  ];

  const allPromises = allTableNames.map((tableName, index) => {
    return new Promise(async (res) => {
      let LastEvaluatedKey;
      do {
        let scanParams = {
          TableName: tableName,
          ScanFilter: condition,
          AttributesToGet: ["id", ownerField],
          ExclusiveStartKey: LastEvaluatedKey,
        };

        const items = await new Promise((resolve) => {
          dynamodb.scan(scanParams, (err, data) => {
            if (err) {
              console.log({ error: "Could not load items: " + err });
              resolve([]);
            } else {
              LastEvaluatedKey = data.LastEvaluatedKey;
              resolve(data.Items);
            }
          });
        });

        if (items.length > 0) {
          console.log(`records to be deleted: ${items.length}`);
          let deleteParams = {
            RequestItems: {
              [tableName]: items.map((item) => {
                return {
                  DeleteRequest: {
                    Key: { id: item.id },
                  },
                };
              }),
            },
          };

          await new Promise((resolve) => {
            dynamodb.batchWrite(deleteParams, (err, data) => {
              resolve();
            });
          });
        }
      } while (LastEvaluatedKey);

      res();
    });
  });
  await Promise.all(allPromises);
  // await new Promise(async (res) => {
  //   let LastEvaluatedKey;

  //   for (const tableName of allTableNames) {
  //     do {
  //       let scanParams = {
  //         TableName: tableName,
  //         ScanFilter: condition,
  //         AttributesToGet: ["id", ownerField],
  //         ExclusiveStartKey: LastEvaluatedKey,
  //       };

  //       const items = await new Promise((resolve) => {
  //         dynamodb.scan(scanParams, (err, data) => {
  //           if (err) {
  //             console.log({ error: "Could not load items: " + err });
  //             resolve([]);
  //           } else {
  //             LastEvaluatedKey = data.LastEvaluatedKey;
  //             resolve(data.Items);
  //           }
  //         });
  //       });

  //       if (items.length > 0) {
  //         console.log(`records to be deleted: ${items.length}`);
  //         let deleteParams = {
  //           RequestItems: {
  //             [tableName]: items.map((item) => {
  //               return {
  //                 DeleteRequest: {
  //                   Key: { id: item.id },
  //                 },
  //               };
  //             }),
  //           },
  //         };

  //         await new Promise((resolve) => {
  //           dynamodb.batchWrite(deleteParams, (err, data) => {
  //             resolve();
  //           });
  //         });
  //       }
  //     } while (LastEvaluatedKey);

  //     res();
  //   }
  // });

  return true; // this means the user data was cleaned up
};
