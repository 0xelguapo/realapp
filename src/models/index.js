// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Client, Property, Task } = initSchema(schema);

export {
  Client,
  Property,
  Task
};