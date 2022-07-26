/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient($owner: String) {
    onCreateClient(owner: $owner) {
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
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient($owner: String) {
    onUpdateClient(owner: $owner) {
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
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient($owner: String) {
    onDeleteClient(owner: $owner) {
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
export const onCreateConnectionHistory = /* GraphQL */ `
  subscription OnCreateConnectionHistory($owner: String) {
    onCreateConnectionHistory(owner: $owner) {
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
export const onUpdateConnectionHistory = /* GraphQL */ `
  subscription OnUpdateConnectionHistory($owner: String) {
    onUpdateConnectionHistory(owner: $owner) {
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
export const onDeleteConnectionHistory = /* GraphQL */ `
  subscription OnDeleteConnectionHistory($owner: String) {
    onDeleteConnectionHistory(owner: $owner) {
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
export const onCreateClientGroup = /* GraphQL */ `
  subscription OnCreateClientGroup($owner: String) {
    onCreateClientGroup(owner: $owner) {
      id
      title
      createdAt
      updatedAt
      clientClientGroupId
      owner
    }
  }
`;
export const onUpdateClientGroup = /* GraphQL */ `
  subscription OnUpdateClientGroup($owner: String) {
    onUpdateClientGroup(owner: $owner) {
      id
      title
      createdAt
      updatedAt
      clientClientGroupId
      owner
    }
  }
`;
export const onDeleteClientGroup = /* GraphQL */ `
  subscription OnDeleteClientGroup($owner: String) {
    onDeleteClientGroup(owner: $owner) {
      id
      title
      createdAt
      updatedAt
      clientClientGroupId
      owner
    }
  }
`;
export const onCreateProperty = /* GraphQL */ `
  subscription OnCreateProperty($owner: String) {
    onCreateProperty(owner: $owner) {
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
export const onUpdateProperty = /* GraphQL */ `
  subscription OnUpdateProperty($owner: String) {
    onUpdateProperty(owner: $owner) {
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
export const onDeleteProperty = /* GraphQL */ `
  subscription OnDeleteProperty($owner: String) {
    onDeleteProperty(owner: $owner) {
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask($owner: String) {
    onCreateTask(owner: $owner) {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask($owner: String) {
    onUpdateTask(owner: $owner) {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask($owner: String) {
    onDeleteTask(owner: $owner) {
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
