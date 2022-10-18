/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient($owner: String) {
    onCreateClient(owner: $owner) {
      id
      firstName
      lastName
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
          price
          capRate
          note
          clientId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      tasks {
        items {
          id
          clientId
          propertyId
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
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient($owner: String) {
    onUpdateClient(owner: $owner) {
      id
      firstName
      lastName
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
          price
          capRate
          note
          clientId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      tasks {
        items {
          id
          clientId
          propertyId
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
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient($owner: String) {
    onDeleteClient(owner: $owner) {
      id
      firstName
      lastName
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
          price
          capRate
          note
          clientId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      tasks {
        items {
          id
          clientId
          propertyId
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
export const onCreateProperty = /* GraphQL */ `
  subscription OnCreateProperty($owner: String) {
    onCreateProperty(owner: $owner) {
      id
      street
      city
      state
      zip
      price
      capRate
      note
      tasks {
        items {
          id
          clientId
          propertyId
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
          propertyID
          propertyGroupID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      clientId
      owner
      createdAt
      updatedAt
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
      price
      capRate
      note
      tasks {
        items {
          id
          clientId
          propertyId
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
          propertyID
          propertyGroupID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      clientId
      owner
      createdAt
      updatedAt
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
      price
      capRate
      note
      tasks {
        items {
          id
          clientId
          propertyId
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
          propertyID
          propertyGroupID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      clientId
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePropertyGroup = /* GraphQL */ `
  subscription OnCreatePropertyGroup($owner: String) {
    onCreatePropertyGroup(owner: $owner) {
      id
      title
      description
      properties {
        items {
          id
          propertyID
          propertyGroupID
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
export const onUpdatePropertyGroup = /* GraphQL */ `
  subscription OnUpdatePropertyGroup($owner: String) {
    onUpdatePropertyGroup(owner: $owner) {
      id
      title
      description
      properties {
        items {
          id
          propertyID
          propertyGroupID
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
export const onDeletePropertyGroup = /* GraphQL */ `
  subscription OnDeletePropertyGroup($owner: String) {
    onDeletePropertyGroup(owner: $owner) {
      id
      title
      description
      properties {
        items {
          id
          propertyID
          propertyGroupID
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
export const onCreateReminder = /* GraphQL */ `
  subscription OnCreateReminder($owner: String) {
    onCreateReminder(owner: $owner) {
      id
      date
      recurring
      recurDate
      notificationId
      clientId
      client {
        id
        firstName
        lastName
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
export const onUpdateReminder = /* GraphQL */ `
  subscription OnUpdateReminder($owner: String) {
    onUpdateReminder(owner: $owner) {
      id
      date
      recurring
      recurDate
      notificationId
      clientId
      client {
        id
        firstName
        lastName
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
export const onDeleteReminder = /* GraphQL */ `
  subscription OnDeleteReminder($owner: String) {
    onDeleteReminder(owner: $owner) {
      id
      date
      recurring
      recurDate
      notificationId
      clientId
      client {
        id
        firstName
        lastName
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
export const onCreateClientGroup = /* GraphQL */ `
  subscription OnCreateClientGroup($owner: String) {
    onCreateClientGroup(owner: $owner) {
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
export const onUpdateClientGroup = /* GraphQL */ `
  subscription OnUpdateClientGroup($owner: String) {
    onUpdateClientGroup(owner: $owner) {
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
export const onDeleteClientGroup = /* GraphQL */ `
  subscription OnDeleteClientGroup($owner: String) {
    onDeleteClientGroup(owner: $owner) {
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
export const onCreateConnectionHistory = /* GraphQL */ `
  subscription OnCreateConnectionHistory($owner: String) {
    onCreateConnectionHistory(owner: $owner) {
      id
      title
      date
      clientId
      client {
        id
        firstName
        lastName
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
export const onUpdateConnectionHistory = /* GraphQL */ `
  subscription OnUpdateConnectionHistory($owner: String) {
    onUpdateConnectionHistory(owner: $owner) {
      id
      title
      date
      clientId
      client {
        id
        firstName
        lastName
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
export const onDeleteConnectionHistory = /* GraphQL */ `
  subscription OnDeleteConnectionHistory($owner: String) {
    onDeleteConnectionHistory(owner: $owner) {
      id
      title
      date
      clientId
      client {
        id
        firstName
        lastName
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask($owner: String) {
    onCreateTask(owner: $owner) {
      id
      clientId
      propertyId
      title
      content
      completed
      date
      notificationId
      client {
        id
        firstName
        lastName
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask($owner: String) {
    onUpdateTask(owner: $owner) {
      id
      clientId
      propertyId
      title
      content
      completed
      date
      notificationId
      client {
        id
        firstName
        lastName
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask($owner: String) {
    onDeleteTask(owner: $owner) {
      id
      clientId
      propertyId
      title
      content
      completed
      date
      notificationId
      client {
        id
        firstName
        lastName
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
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($owner: String) {
    onCreateNote(owner: $owner) {
      id
      title
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($owner: String) {
    onUpdateNote(owner: $owner) {
      id
      title
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($owner: String) {
    onDeleteNote(owner: $owner) {
      id
      title
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGroupsClients = /* GraphQL */ `
  subscription OnCreateGroupsClients($owner: String) {
    onCreateGroupsClients(owner: $owner) {
      id
      clientID
      clientGroupID
      client {
        id
        firstName
        lastName
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
export const onUpdateGroupsClients = /* GraphQL */ `
  subscription OnUpdateGroupsClients($owner: String) {
    onUpdateGroupsClients(owner: $owner) {
      id
      clientID
      clientGroupID
      client {
        id
        firstName
        lastName
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
export const onDeleteGroupsClients = /* GraphQL */ `
  subscription OnDeleteGroupsClients($owner: String) {
    onDeleteGroupsClients(owner: $owner) {
      id
      clientID
      clientGroupID
      client {
        id
        firstName
        lastName
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
export const onCreateGroupsProperty = /* GraphQL */ `
  subscription OnCreateGroupsProperty($owner: String) {
    onCreateGroupsProperty(owner: $owner) {
      id
      propertyID
      propertyGroupID
      property {
        id
        street
        city
        state
        zip
        price
        capRate
        note
        tasks {
          nextToken
        }
        group {
          nextToken
        }
        clientId
        owner
        createdAt
        updatedAt
      }
      propertyGroup {
        id
        title
        description
        properties {
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
export const onUpdateGroupsProperty = /* GraphQL */ `
  subscription OnUpdateGroupsProperty($owner: String) {
    onUpdateGroupsProperty(owner: $owner) {
      id
      propertyID
      propertyGroupID
      property {
        id
        street
        city
        state
        zip
        price
        capRate
        note
        tasks {
          nextToken
        }
        group {
          nextToken
        }
        clientId
        owner
        createdAt
        updatedAt
      }
      propertyGroup {
        id
        title
        description
        properties {
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
export const onDeleteGroupsProperty = /* GraphQL */ `
  subscription OnDeleteGroupsProperty($owner: String) {
    onDeleteGroupsProperty(owner: $owner) {
      id
      propertyID
      propertyGroupID
      property {
        id
        street
        city
        state
        zip
        price
        capRate
        note
        tasks {
          nextToken
        }
        group {
          nextToken
        }
        clientId
        owner
        createdAt
        updatedAt
      }
      propertyGroup {
        id
        title
        description
        properties {
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
