/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getGoal = /* GraphQL */ `
  query GetGoal($id: ID!) {
    getGoal(id: $id) {
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
export const listGoals = /* GraphQL */ `
  query ListGoals(
    $filter: ModelGoalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGoals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getClient = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
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
          recurRule
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
export const listClients = /* GraphQL */ `
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
      nextToken
    }
  }
`;
export const getProperty = /* GraphQL */ `
  query GetProperty($id: ID!) {
    getProperty(id: $id) {
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
          recurRule
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
export const listProperties = /* GraphQL */ `
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
      nextToken
    }
  }
`;
export const getPropertyGroup = /* GraphQL */ `
  query GetPropertyGroup($id: ID!) {
    getPropertyGroup(id: $id) {
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
export const listPropertyGroups = /* GraphQL */ `
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
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      title
      content
      completed
      date
      endDate
      notificationId
      type
      recurRule
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
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        completed
        date
        endDate
        notificationId
        type
        recurRule
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
export const getDeal = /* GraphQL */ `
  query GetDeal($id: ID!) {
    getDeal(id: $id) {
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
export const listDeals = /* GraphQL */ `
  query ListDeals(
    $filter: ModelDealFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          clientId
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
export const getGroupsClients = /* GraphQL */ `
  query GetGroupsClients($id: ID!) {
    getGroupsClients(id: $id) {
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
export const getGroupsProperty = /* GraphQL */ `
  query GetGroupsProperty($id: ID!) {
    getGroupsProperty(id: $id) {
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
export const listGroupsProperties = /* GraphQL */ `
  query ListGroupsProperties(
    $filter: ModelGroupsPropertyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroupsProperties(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          clientId
          owner
          createdAt
          updatedAt
        }
        propertyGroup {
          id
          title
          description
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
    $firstName: String!
    $sortDirection: ModelSortDirection
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    clientByFirstName(
      firstName: $firstName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
