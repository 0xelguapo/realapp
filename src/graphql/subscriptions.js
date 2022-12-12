/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      id
      name
      email
      streakDate
      streakCount
      google_access_token
      google_refresh_token
      expo_token
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      id
      name
      email
      streakDate
      streakCount
      google_access_token
      google_refresh_token
      expo_token
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      id
      name
      email
      streakDate
      streakCount
      google_access_token
      google_refresh_token
      expo_token
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGoal = /* GraphQL */ `
  subscription OnCreateGoal(
    $filter: ModelSubscriptionGoalFilterInput
    $owner: String
  ) {
    onCreateGoal(filter: $filter, owner: $owner) {
      id
      title
      content
      timesPerDay
      timesCompleted
      recurRule
      notificationId
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGoal = /* GraphQL */ `
  subscription OnUpdateGoal(
    $filter: ModelSubscriptionGoalFilterInput
    $owner: String
  ) {
    onUpdateGoal(filter: $filter, owner: $owner) {
      id
      title
      content
      timesPerDay
      timesCompleted
      recurRule
      notificationId
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGoal = /* GraphQL */ `
  subscription OnDeleteGoal(
    $filter: ModelSubscriptionGoalFilterInput
    $owner: String
  ) {
    onDeleteGoal(filter: $filter, owner: $owner) {
      id
      title
      content
      timesPerDay
      timesCompleted
      recurRule
      notificationId
      owner
      createdAt
      updatedAt
    }
  }
`;
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
      birthday
      favorite
      clientStreet
      clientCity
      clientState
      clientZip
      connectionHistory {
        items {
          id
          title
          content
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
          type
          street
          city
          state
          zip
          price
          note
          geometry
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
          title
          content
          completed
          date
          endDate
          notificationId
          type
          clientId
          propertyId
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
          freq
          recurring
          recurRule
          notificationId
          lastCompleteDate
          clientId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      deal {
        items {
          id
          title
          amount
          stage
          note
          closeDate
          clientId
          propertyId
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
      birthday
      favorite
      clientStreet
      clientCity
      clientState
      clientZip
      connectionHistory {
        items {
          id
          title
          content
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
          type
          street
          city
          state
          zip
          price
          note
          geometry
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
          title
          content
          completed
          date
          endDate
          notificationId
          type
          clientId
          propertyId
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
          freq
          recurring
          recurRule
          notificationId
          lastCompleteDate
          clientId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      deal {
        items {
          id
          title
          amount
          stage
          note
          closeDate
          clientId
          propertyId
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
      birthday
      favorite
      clientStreet
      clientCity
      clientState
      clientZip
      connectionHistory {
        items {
          id
          title
          content
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
          type
          street
          city
          state
          zip
          price
          note
          geometry
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
          title
          content
          completed
          date
          endDate
          notificationId
          type
          clientId
          propertyId
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
          freq
          recurring
          recurRule
          notificationId
          lastCompleteDate
          clientId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      deal {
        items {
          id
          title
          amount
          stage
          note
          closeDate
          clientId
          propertyId
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
      type
      street
      city
      state
      zip
      price
      note
      geometry
      tasks {
        items {
          id
          title
          content
          completed
          date
          endDate
          notificationId
          type
          clientId
          propertyId
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
      deal {
        items {
          id
          title
          amount
          stage
          note
          closeDate
          clientId
          propertyId
          owner
          createdAt
          updatedAt
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
      type
      street
      city
      state
      zip
      price
      note
      geometry
      tasks {
        items {
          id
          title
          content
          completed
          date
          endDate
          notificationId
          type
          clientId
          propertyId
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
      deal {
        items {
          id
          title
          amount
          stage
          note
          closeDate
          clientId
          propertyId
          owner
          createdAt
          updatedAt
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
      type
      street
      city
      state
      zip
      price
      note
      geometry
      tasks {
        items {
          id
          title
          content
          completed
          date
          endDate
          notificationId
          type
          clientId
          propertyId
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
      deal {
        items {
          id
          title
          amount
          stage
          note
          closeDate
          clientId
          propertyId
          owner
          createdAt
          updatedAt
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
      freq
      recurring
      recurRule
      notificationId
      lastCompleteDate
      clientId
      client {
        id
        firstName
        lastName
        company
        phone
        email
        notes
        birthday
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
        deal {
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
      freq
      recurring
      recurRule
      notificationId
      lastCompleteDate
      clientId
      client {
        id
        firstName
        lastName
        company
        phone
        email
        notes
        birthday
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
        deal {
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
      freq
      recurring
      recurRule
      notificationId
      lastCompleteDate
      clientId
      client {
        id
        firstName
        lastName
        company
        phone
        email
        notes
        birthday
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
        deal {
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
      content
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
        birthday
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
        deal {
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
      content
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
        birthday
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
        deal {
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
      content
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
        birthday
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
        deal {
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
      title
      content
      completed
      date
      endDate
      notificationId
      type
      clientId
      propertyId
      client {
        id
        firstName
        lastName
        company
        phone
        email
        notes
        birthday
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
        deal {
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
      title
      content
      completed
      date
      endDate
      notificationId
      type
      clientId
      propertyId
      client {
        id
        firstName
        lastName
        company
        phone
        email
        notes
        birthday
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
        deal {
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
      title
      content
      completed
      date
      endDate
      notificationId
      type
      clientId
      propertyId
      client {
        id
        firstName
        lastName
        company
        phone
        email
        notes
        birthday
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
        deal {
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
export const onCreateDeal = /* GraphQL */ `
  subscription OnCreateDeal(
    $filter: ModelSubscriptionDealFilterInput
    $owner: String
  ) {
    onCreateDeal(filter: $filter, owner: $owner) {
      id
      title
      amount
      stage
      note
      closeDate
      clientId
      client {
        id
        firstName
        lastName
        company
        phone
        email
        notes
        birthday
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
        deal {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      propertyId
      property {
        id
        type
        street
        city
        state
        zip
        price
        note
        geometry
        tasks {
          nextToken
        }
        group {
          nextToken
        }
        deal {
          nextToken
        }
        clientId
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
export const onUpdateDeal = /* GraphQL */ `
  subscription OnUpdateDeal(
    $filter: ModelSubscriptionDealFilterInput
    $owner: String
  ) {
    onUpdateDeal(filter: $filter, owner: $owner) {
      id
      title
      amount
      stage
      note
      closeDate
      clientId
      client {
        id
        firstName
        lastName
        company
        phone
        email
        notes
        birthday
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
        deal {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      propertyId
      property {
        id
        type
        street
        city
        state
        zip
        price
        note
        geometry
        tasks {
          nextToken
        }
        group {
          nextToken
        }
        deal {
          nextToken
        }
        clientId
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
export const onDeleteDeal = /* GraphQL */ `
  subscription OnDeleteDeal(
    $filter: ModelSubscriptionDealFilterInput
    $owner: String
  ) {
    onDeleteDeal(filter: $filter, owner: $owner) {
      id
      title
      amount
      stage
      note
      closeDate
      clientId
      client {
        id
        firstName
        lastName
        company
        phone
        email
        notes
        birthday
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
        deal {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      propertyId
      property {
        id
        type
        street
        city
        state
        zip
        price
        note
        geometry
        tasks {
          nextToken
        }
        group {
          nextToken
        }
        deal {
          nextToken
        }
        clientId
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
        birthday
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
        deal {
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
        birthday
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
        deal {
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
        birthday
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
        deal {
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
        type
        street
        city
        state
        zip
        price
        note
        geometry
        tasks {
          nextToken
        }
        group {
          nextToken
        }
        deal {
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
        type
        street
        city
        state
        zip
        price
        note
        geometry
        tasks {
          nextToken
        }
        group {
          nextToken
        }
        deal {
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
        type
        street
        city
        state
        zip
        price
        note
        geometry
        tasks {
          nextToken
        }
        group {
          nextToken
        }
        deal {
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
