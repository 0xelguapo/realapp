export const getUserStreak = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      streakDate
      streakCount
    }
  }
`;

export const updateUserStreak = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      streakDate
      streakCount
    }
  }
`;

export const getClientGroups = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      firstName
      lastName
      group {
        items {
          id
          clientGroupID
          owner
        }
        nextToken
      }
    }
  }
`;

export const listClientsWithGroups = /* GraphQL */ `
  query ListClients(
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        company
        group {
          items {
            id
            clientID
            clientGroupID
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;


export const listPropertiesWithGroups = /* GraphQL */ `
  query ListProperties(
    $filter: ModelPropertyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProperties(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        street
        city
        state
        zip
        price
        note
        geometry
        group {
          items {
            id
            propertyID
            propertyGroupID
          }
          nextToken
        }
        clientId
        owner
      }
      nextToken
    }
  }
`;

export const listClientGroupsWithClients = /* GraphQL */ `
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
          items {
            id
            clientID
            clientGroupID
            createdAt
              client {
                id
                firstName
                lastName
                phone
                email
                company
              }
          }
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

export const getClientGroupWithClientDetails = /* GraphQL */ `
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
            client {
              id
              firstName
              lastName
              phone
              email
              company
            }
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;

export const createReminder = /* GraphQL */ `
  mutation CreateReminder(
    $input: CreateReminderInput!
    $condition: ModelReminderConditionInput
  ) {
    createReminder(input: $input, condition: $condition) {
      id
      date
      recurring
      recurDate
      clientId
      client {
        id
        firstName
        lastName
        reminder {
          id
          date
          recurring
          recurDate
          clientId
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        clientReminderId
        owner
      }
      createdAt
      updatedAt
      owner
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
        freq
        recurring
        notificationId
        recurRule
        clientId
        client {
          id
          firstName
          lastName
          company
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listPropertyGroupsWithProperties = /* GraphQL */ `
  query ListPropertyGroups(
    $filter: ModelPropertyGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPropertyGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        properties {
          items {
            id
            propertyID
            propertyGroupID
            createdAt
              property {
                id
                street
                city
                state
                zip
              }
          }
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