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
      nextToken
    }
  }
`;
export const getConnectionHistory = /* GraphQL */ `
  query GetConnectionHistory($id: ID!) {
    getConnectionHistory(id: $id) {
      id
      title
      createdAt
      updatedAt
      clientConnectionHistoryId
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
        createdAt
        updatedAt
        clientConnectionHistoryId
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
      createdAt
      updatedAt
      clientClientGroupId
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
        createdAt
        updatedAt
        clientClientGroupId
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
      nextToken
    }
  }
`;
export const groupByTitle = /* GraphQL */ `
  query GroupByTitle(
    $title: String!
    $sortDirection: ModelSortDirection
    $filter: ModelClientGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    groupByTitle(
      title: $title
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
