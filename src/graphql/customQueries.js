export const getClientGroups = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      name
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
                name
                phone
                email
                company
                group {
                  items {
                    id
                    clientGroupID
                  }
                }
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
              name
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
        name
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
        date
        recurring
        recurDate
        clientId
        client {
          id
          name
          company
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;