/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClient = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
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
export const listClients = /* GraphQL */ `
  query ListClients(
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getClientGroup = /* GraphQL */ `
  query GetClientGroup($id: ID!) {
    getClientGroup(id: $id) {
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
export const listClientGroups = /* GraphQL */ `
  query ListClientGroups(
    $filter: ModelClientGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClientGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        clients {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getConnectionHistory = /* GraphQL */ `
  query GetConnectionHistory($id: ID!) {
    getConnectionHistory(id: $id) {
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
export const listConnectionHistories = /* GraphQL */ `
  query ListConnectionHistories(
    $filter: ModelConnectionHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConnectionHistories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getProperty = /* GraphQL */ `
  query GetProperty($id: ID!) {
    getProperty(id: $id) {
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
export const listProperties = /* GraphQL */ `
  query ListProperties(
    $filter: ModelPropertyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProperties(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        clientPropertiesId
        owner
      }
      nextToken
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
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
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getGroupsClients = /* GraphQL */ `
  query GetGroupsClients($id: ID!) {
    getGroupsClients(id: $id) {
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
export const listGroupsClients = /* GraphQL */ `
  query ListGroupsClients(
    $filter: ModelGroupsClientsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroupsClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
          owner
        }
        clientGroup {
          id
          title
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const clientByName = /* GraphQL */ `
  query ClientByName(
    $name: String!
    $sortDirection: ModelSortDirection
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    clientByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
