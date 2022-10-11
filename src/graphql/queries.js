/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClient = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      firstname
      lastname
      company
      phone
      email
      notes
      favorite
      clientStreet
      clientCity
      clientState
      clientZip
      connectionHistory {
        items {
          id
          title
          date
          clientId
          owner
          createdAt
          updatedAt
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
          owner
          createdAt
          updatedAt
          clientPropertiesId
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
          notificationId
          owner
          createdAt
          updatedAt
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
      reminder {
        items {
          id
          date
          recurring
          recurDate
          notificationId
          clientId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
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
        firstname
        lastname
        company
        phone
        email
        notes
        favorite
        clientStreet
        clientCity
        clientState
        clientZip
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
        reminder {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReminder = /* GraphQL */ `
  query GetReminder($id: ID!) {
    getReminder(id: $id) {
      id
      date
      recurring
      recurDate
      notificationId
      clientId
      client {
        id
        firstname
        lastname
        company
        phone
        email
        notes
        favorite
        clientStreet
        clientCity
        clientState
        clientZip
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
        reminder {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listReminders = /* GraphQL */ `
  query ListReminders(
    $filter: ModelReminderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReminders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        recurring
        recurDate
        notificationId
        clientId
        client {
          id
          firstname
          lastname
          company
          phone
          email
          notes
          favorite
          clientStreet
          clientCity
          clientState
          clientZip
          owner
          createdAt
          updatedAt
        }
        owner
        createdAt
        updatedAt
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
      owner
      createdAt
      updatedAt
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
        owner
        createdAt
        updatedAt
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
        firstname
        lastname
        company
        phone
        email
        notes
        favorite
        clientStreet
        clientCity
        clientState
        clientZip
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
        reminder {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      owner
      createdAt
      updatedAt
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
          firstname
          lastname
          company
          phone
          email
          notes
          favorite
          clientStreet
          clientCity
          clientState
          clientZip
          owner
          createdAt
          updatedAt
        }
        owner
        createdAt
        updatedAt
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
        firstname
        lastname
        company
        phone
        email
        notes
        favorite
        clientStreet
        clientCity
        clientState
        clientZip
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
        reminder {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      owner
      createdAt
      updatedAt
      clientPropertiesId
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
          firstname
          lastname
          company
          phone
          email
          notes
          favorite
          clientStreet
          clientCity
          clientState
          clientZip
          owner
          createdAt
          updatedAt
        }
        owner
        createdAt
        updatedAt
        clientPropertiesId
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
      notificationId
      client {
        id
        firstname
        lastname
        company
        phone
        email
        notes
        favorite
        clientStreet
        clientCity
        clientState
        clientZip
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
        reminder {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      owner
      createdAt
      updatedAt
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
        notificationId
        client {
          id
          firstname
          lastname
          company
          phone
          email
          notes
          favorite
          clientStreet
          clientCity
          clientState
          clientZip
          owner
          createdAt
          updatedAt
        }
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      title
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        owner
        createdAt
        updatedAt
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
        firstname
        lastname
        company
        phone
        email
        notes
        favorite
        clientStreet
        clientCity
        clientState
        clientZip
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
        reminder {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      clientGroup {
        id
        title
        clients {
          nextToken
        }
        owner
        createdAt
        updatedAt
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
          firstname
          lastname
          company
          phone
          email
          notes
          favorite
          clientStreet
          clientCity
          clientState
          clientZip
          owner
          createdAt
          updatedAt
        }
        clientGroup {
          id
          title
          owner
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const clientByFirstName = /* GraphQL */ `
  query ClientByFirstName(
    $firstname: String!
    $sortDirection: ModelSortDirection
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    clientByFirstName(
      firstname: $firstname
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        firstname
        lastname
        company
        phone
        email
        notes
        favorite
        clientStreet
        clientCity
        clientState
        clientZip
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
        reminder {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const clientByLastName = /* GraphQL */ `
  query ClientByLastName(
    $lastname: String!
    $sortDirection: ModelSortDirection
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    clientByLastName(
      lastname: $lastname
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        firstname
        lastname
        company
        phone
        email
        notes
        favorite
        clientStreet
        clientCity
        clientState
        clientZip
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
        reminder {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
