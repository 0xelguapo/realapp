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