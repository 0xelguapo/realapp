import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ClientMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Client {
  readonly id: string;
  readonly name: string;
  readonly company?: string;
  readonly phone?: string;
  readonly email?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Client, ClientMetaData>);
  static copyOf(source: Client, mutator: (draft: MutableModel<Client, ClientMetaData>) => MutableModel<Client, ClientMetaData> | void): Client;
}