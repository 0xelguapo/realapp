/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const batchDelete = /* GraphQL */ `
  mutation BatchDelete($ids: [ID]) {
    batchDelete(ids: $ids) {
      id
      name
      company
      phone
      email
      notes
      favorite
      connectionHistory {
        items {
          id
          title
          createdAt
          updatedAt
          clientConnectionHistoryId
          owner
        }
        nextToken
      }
      clientGroup {
        items {
          id
          title
          createdAt
          updatedAt
          clientClientGroupId
          owner
        }
        nextToken
      }
      properties {
        items {
          id
          street
          city
          state
          zip
          createdAt
          updatedAt
          clientPropertiesId
          owner
        }
        nextToken
      }
      tasks {
        items {
          id
          clientId
          title
          content
          completed
          date
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createClient = /* GraphQL */ `
  mutation CreateClient(
    $input: CreateClientInput!
    $condition: ModelClientConditionInput
  ) {
    createClient(input: $input, condition: $condition) {
      id
      name
      company
      phone
      email
      notes
      favorite
      connectionHistory {
        items {
          id
          title
          createdAt
          updatedAt
          clientConnectionHistoryId
          owner
        }
        nextToken
      }
      clientGroup {
        items {
          id
          title
          createdAt
          updatedAt
          clientClientGroupId
          owner
        }
        nextToken
      }
      properties {
        items {
          id
          street
          city
          state
          zip
          createdAt
          updatedAt
          clientPropertiesId
          owner
        }
        nextToken
      }
      tasks {
        items {
          id
          clientId
          title
          content
          completed
          date
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
      id
      name
      company
      phone
      email
      notes
      favorite
      connectionHistory {
        items {
          id
          title
          createdAt
          updatedAt
          clientConnectionHistoryId
          owner
        }
        nextToken
      }
      clientGroup {
        items {
          id
          title
          createdAt
          updatedAt
          clientClientGroupId
          owner
        }
        nextToken
      }
      properties {
        items {
          id
          street
          city
          state
          zip
          createdAt
          updatedAt
          clientPropertiesId
          owner
        }
        nextToken
      }
      tasks {
        items {
          id
          clientId
          title
          content
          completed
          date
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
      id
      name
      company
      phone
      email
      notes
      favorite
      connectionHistory {
        items {
          id
          title
          createdAt
          updatedAt
          clientConnectionHistoryId
          owner
        }
        nextToken
      }
      clientGroup {
        items {
          id
          title
          createdAt
          updatedAt
          clientClientGroupId
          owner
        }
        nextToken
      }
      properties {
        items {
          id
          street
          city
          state
          zip
          createdAt
          updatedAt
          clientPropertiesId
          owner
        }
        nextToken
      }
      tasks {
        items {
          id
          clientId
          title
          content
          completed
          date
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createConnectionHistory = /* GraphQL */ `
  mutation CreateConnectionHistory(
    $input: CreateConnectionHistoryInput!
    $condition: ModelConnectionHistoryConditionInput
  ) {
    createConnectionHistory(input: $input, condition: $condition) {
      id
      title
      createdAt
      updatedAt
      clientConnectionHistoryId
      owner
    }
  }
`;
export const updateConnectionHistory = /* GraphQL */ `
  mutation UpdateConnectionHistory(
    $input: UpdateConnectionHistoryInput!
    $condition: ModelConnectionHistoryConditionInput
  ) {
    updateConnectionHistory(input: $input, condition: $condition) {
      id
      title
      createdAt
      updatedAt
      clientConnectionHistoryId
      owner
    }
  }
`;
export const deleteConnectionHistory = /* GraphQL */ `
  mutation DeleteConnectionHistory(
    $input: DeleteConnectionHistoryInput!
    $condition: ModelConnectionHistoryConditionInput
  ) {
    deleteConnectionHistory(input: $input, condition: $condition) {
      id
      title
      createdAt
      updatedAt
      clientConnectionHistoryId
      owner
    }
  }
`;
export const createClientGroup = /* GraphQL */ `
  mutation CreateClientGroup(
    $input: CreateClientGroupInput!
    $condition: ModelClientGroupConditionInput
  ) {
    createClientGroup(input: $input, condition: $condition) {
      id
      title
      createdAt
      updatedAt
      clientClientGroupId
      owner
    }
  }
`;
export const updateClientGroup = /* GraphQL */ `
  mutation UpdateClientGroup(
    $input: UpdateClientGroupInput!
    $condition: ModelClientGroupConditionInput
  ) {
    updateClientGroup(input: $input, condition: $condition) {
      id
      title
      createdAt
      updatedAt
      clientClientGroupId
      owner
    }
  }
`;
export const deleteClientGroup = /* GraphQL */ `
  mutation DeleteClientGroup(
    $input: DeleteClientGroupInput!
    $condition: ModelClientGroupConditionInput
  ) {
    deleteClientGroup(input: $input, condition: $condition) {
      id
      title
      createdAt
      updatedAt
      clientClientGroupId
      owner
    }
  }
`;
export const createProperty = /* GraphQL */ `
  mutation CreateProperty(
    $input: CreatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    createProperty(input: $input, condition: $condition) {
      id
      street
      city
      state
      zip
      client {
        id
        name
        company
        phone
        email
        notes
        favorite
        connectionHistory {
          nextToken
        }
        clientGroup {
          nextToken
        }
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      clientPropertiesId
      owner
    }
  }
`;
export const updateProperty = /* GraphQL */ `
  mutation UpdateProperty(
    $input: UpdatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    updateProperty(input: $input, condition: $condition) {
      id
      street
      city
      state
      zip
      client {
        id
        name
        company
        phone
        email
        notes
        favorite
        connectionHistory {
          nextToken
        }
        clientGroup {
          nextToken
        }
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      clientPropertiesId
      owner
    }
  }
`;
export const deleteProperty = /* GraphQL */ `
  mutation DeleteProperty(
    $input: DeletePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    deleteProperty(input: $input, condition: $condition) {
      id
      street
      city
      state
      zip
      client {
        id
        name
        company
        phone
        email
        notes
        favorite
        connectionHistory {
          nextToken
        }
        clientGroup {
          nextToken
        }
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      clientPropertiesId
      owner
    }
  }
`;
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
      id
      clientId
      title
      content
      completed
      date
      client {
        id
        name
        company
        phone
        email
        notes
        favorite
        connectionHistory {
          nextToken
        }
        clientGroup {
          nextToken
        }
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
      id
      clientId
      title
      content
      completed
      date
      client {
        id
        name
        company
        phone
        email
        notes
        favorite
        connectionHistory {
          nextToken
        }
        clientGroup {
          nextToken
        }
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
      id
      clientId
      title
      content
      completed
      date
      client {
        id
        name
        company
        phone
        email
        notes
        favorite
        connectionHistory {
          nextToken
        }
        clientGroup {
          nextToken
        }
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
