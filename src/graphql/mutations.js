/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
          date
          clientId
          createdAt
          updatedAt
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
      group {
        items {
          id
          clientID
          clientGroupID
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
          date
          clientId
          createdAt
          updatedAt
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
      group {
        items {
          id
          clientID
          clientGroupID
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
          date
          clientId
          createdAt
          updatedAt
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
      group {
        items {
          id
          clientID
          clientGroupID
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
export const createClientGroup = /* GraphQL */ `
  mutation CreateClientGroup(
    $input: CreateClientGroupInput!
    $condition: ModelClientGroupConditionInput
  ) {
    createClientGroup(input: $input, condition: $condition) {
      id
      title
      clients {
        items {
          id
          clientID
          clientGroupID
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
export const updateClientGroup = /* GraphQL */ `
  mutation UpdateClientGroup(
    $input: UpdateClientGroupInput!
    $condition: ModelClientGroupConditionInput
  ) {
    updateClientGroup(input: $input, condition: $condition) {
      id
      title
      clients {
        items {
          id
          clientID
          clientGroupID
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
export const deleteClientGroup = /* GraphQL */ `
  mutation DeleteClientGroup(
    $input: DeleteClientGroupInput!
    $condition: ModelClientGroupConditionInput
  ) {
    deleteClientGroup(input: $input, condition: $condition) {
      id
      title
      clients {
        items {
          id
          clientID
          clientGroupID
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
      date
      clientId
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
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        group {
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
export const updateConnectionHistory = /* GraphQL */ `
  mutation UpdateConnectionHistory(
    $input: UpdateConnectionHistoryInput!
    $condition: ModelConnectionHistoryConditionInput
  ) {
    updateConnectionHistory(input: $input, condition: $condition) {
      id
      title
      date
      clientId
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
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        group {
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
export const deleteConnectionHistory = /* GraphQL */ `
  mutation DeleteConnectionHistory(
    $input: DeleteConnectionHistoryInput!
    $condition: ModelConnectionHistoryConditionInput
  ) {
    deleteConnectionHistory(input: $input, condition: $condition) {
      id
      title
      date
      clientId
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
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        group {
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
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        group {
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
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        group {
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
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        group {
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
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        group {
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
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        group {
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
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        group {
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
export const createGroupsClients = /* GraphQL */ `
  mutation CreateGroupsClients(
    $input: CreateGroupsClientsInput!
    $condition: ModelGroupsClientsConditionInput
  ) {
    createGroupsClients(input: $input, condition: $condition) {
      id
      clientID
      clientGroupID
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
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        group {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      clientGroup {
        id
        title
        clients {
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
export const updateGroupsClients = /* GraphQL */ `
  mutation UpdateGroupsClients(
    $input: UpdateGroupsClientsInput!
    $condition: ModelGroupsClientsConditionInput
  ) {
    updateGroupsClients(input: $input, condition: $condition) {
      id
      clientID
      clientGroupID
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
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        group {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      clientGroup {
        id
        title
        clients {
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
export const deleteGroupsClients = /* GraphQL */ `
  mutation DeleteGroupsClients(
    $input: DeleteGroupsClientsInput!
    $condition: ModelGroupsClientsConditionInput
  ) {
    deleteGroupsClients(input: $input, condition: $condition) {
      id
      clientID
      clientGroupID
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
        properties {
          nextToken
        }
        tasks {
          nextToken
        }
        group {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      clientGroup {
        id
        title
        clients {
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
