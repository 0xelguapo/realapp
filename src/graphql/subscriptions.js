/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient(
    $filter: ModelSubscriptionClientFilterInput
    $owner: String
  ) {
    onCreateClient(filter: $filter, owner: $owner) {
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
  subscription OnUpdateClient(
    $filter: ModelSubscriptionClientFilterInput
    $owner: String
  ) {
    onUpdateClient(filter: $filter, owner: $owner) {
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
  subscription OnDeleteClient(
    $filter: ModelSubscriptionClientFilterInput
    $owner: String
  ) {
    onDeleteClient(filter: $filter, owner: $owner) {
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
  subscription OnCreateProperty(
    $filter: ModelSubscriptionPropertyFilterInput
    $owner: String
  ) {
    onCreateProperty(filter: $filter, owner: $owner) {
      id
      street
      city
      state
      zip
      price
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
  subscription OnUpdateProperty(
    $filter: ModelSubscriptionPropertyFilterInput
    $owner: String
  ) {
    onUpdateProperty(filter: $filter, owner: $owner) {
      id
      street
      city
      state
      zip
      price
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
  subscription OnDeleteProperty(
    $filter: ModelSubscriptionPropertyFilterInput
    $owner: String
  ) {
    onDeleteProperty(filter: $filter, owner: $owner) {
      id
      street
      city
      state
      zip
      price
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
  subscription OnCreatePropertyGroup(
    $filter: ModelSubscriptionPropertyGroupFilterInput
    $owner: String
  ) {
    onCreatePropertyGroup(filter: $filter, owner: $owner) {
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
  subscription OnUpdatePropertyGroup(
    $filter: ModelSubscriptionPropertyGroupFilterInput
    $owner: String
  ) {
    onUpdatePropertyGroup(filter: $filter, owner: $owner) {
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
  subscription OnDeletePropertyGroup(
    $filter: ModelSubscriptionPropertyGroupFilterInput
    $owner: String
  ) {
    onDeletePropertyGroup(filter: $filter, owner: $owner) {
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
  subscription OnCreateReminder(
    $filter: ModelSubscriptionReminderFilterInput
    $owner: String
  ) {
    onCreateReminder(filter: $filter, owner: $owner) {
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
  subscription OnUpdateReminder(
    $filter: ModelSubscriptionReminderFilterInput
    $owner: String
  ) {
    onUpdateReminder(filter: $filter, owner: $owner) {
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
  subscription OnDeleteReminder(
    $filter: ModelSubscriptionReminderFilterInput
    $owner: String
  ) {
    onDeleteReminder(filter: $filter, owner: $owner) {
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
  subscription OnCreateClientGroup(
    $filter: ModelSubscriptionClientGroupFilterInput
    $owner: String
  ) {
    onCreateClientGroup(filter: $filter, owner: $owner) {
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
  subscription OnUpdateClientGroup(
    $filter: ModelSubscriptionClientGroupFilterInput
    $owner: String
  ) {
    onUpdateClientGroup(filter: $filter, owner: $owner) {
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
  subscription OnDeleteClientGroup(
    $filter: ModelSubscriptionClientGroupFilterInput
    $owner: String
  ) {
    onDeleteClientGroup(filter: $filter, owner: $owner) {
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
  subscription OnCreateConnectionHistory(
    $filter: ModelSubscriptionConnectionHistoryFilterInput
    $owner: String
  ) {
    onCreateConnectionHistory(filter: $filter, owner: $owner) {
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
  subscription OnUpdateConnectionHistory(
    $filter: ModelSubscriptionConnectionHistoryFilterInput
    $owner: String
  ) {
    onUpdateConnectionHistory(filter: $filter, owner: $owner) {
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
  subscription OnDeleteConnectionHistory(
    $filter: ModelSubscriptionConnectionHistoryFilterInput
    $owner: String
  ) {
    onDeleteConnectionHistory(filter: $filter, owner: $owner) {
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
  subscription OnCreateTask(
    $filter: ModelSubscriptionTaskFilterInput
    $owner: String
  ) {
    onCreateTask(filter: $filter, owner: $owner) {
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
  subscription OnUpdateTask(
    $filter: ModelSubscriptionTaskFilterInput
    $owner: String
  ) {
    onUpdateTask(filter: $filter, owner: $owner) {
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
  subscription OnDeleteTask(
    $filter: ModelSubscriptionTaskFilterInput
    $owner: String
  ) {
    onDeleteTask(filter: $filter, owner: $owner) {
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
  subscription OnCreateNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onCreateNote(filter: $filter, owner: $owner) {
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
  subscription OnUpdateNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onUpdateNote(filter: $filter, owner: $owner) {
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
  subscription OnDeleteNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onDeleteNote(filter: $filter, owner: $owner) {
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
  subscription OnCreateGroupsClients(
    $filter: ModelSubscriptionGroupsClientsFilterInput
    $owner: String
  ) {
    onCreateGroupsClients(filter: $filter, owner: $owner) {
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
  subscription OnUpdateGroupsClients(
    $filter: ModelSubscriptionGroupsClientsFilterInput
    $owner: String
  ) {
    onUpdateGroupsClients(filter: $filter, owner: $owner) {
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
  subscription OnDeleteGroupsClients(
    $filter: ModelSubscriptionGroupsClientsFilterInput
    $owner: String
  ) {
    onDeleteGroupsClients(filter: $filter, owner: $owner) {
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
  subscription OnCreateGroupsProperty(
    $filter: ModelSubscriptionGroupsPropertyFilterInput
    $owner: String
  ) {
    onCreateGroupsProperty(filter: $filter, owner: $owner) {
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
  subscription OnUpdateGroupsProperty(
    $filter: ModelSubscriptionGroupsPropertyFilterInput
    $owner: String
  ) {
    onUpdateGroupsProperty(filter: $filter, owner: $owner) {
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
  subscription OnDeleteGroupsProperty(
    $filter: ModelSubscriptionGroupsPropertyFilterInput
    $owner: String
  ) {
    onDeleteGroupsProperty(filter: $filter, owner: $owner) {
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
