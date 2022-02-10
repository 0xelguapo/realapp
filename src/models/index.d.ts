import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ClientMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PropertyMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TaskMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Client {
  readonly id: string;
  readonly name: string;
  readonly company?: string;
  readonly phone?: string;
  readonly email?: string;
  readonly properties?: (Property | null)[];
  readonly tasks?: (Task | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Client, ClientMetaData>);
  static copyOf(source: Client, mutator: (draft: MutableModel<Client, ClientMetaData>) => MutableModel<Client, ClientMetaData> | void): Client;
}

export declare class Property {
  readonly id: string;
  readonly street: string;
  readonly city?: string;
  readonly state?: string;
  readonly zip?: number;
  readonly client?: Client;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Property, PropertyMetaData>);
  static copyOf(source: Property, mutator: (draft: MutableModel<Property, PropertyMetaData>) => MutableModel<Property, PropertyMetaData> | void): Property;
}

export declare class Task {
  readonly id: string;
  readonly content: string;
  readonly client?: Client;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Task, TaskMetaData>);
  static copyOf(source: Task, mutator: (draft: MutableModel<Task, TaskMetaData>) => MutableModel<Task, TaskMetaData> | void): Task;
}