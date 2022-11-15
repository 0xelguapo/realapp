/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const batchCreateClients = /* GraphQL */ `
  mutation BatchCreateClients($data: AWSJSON, $mappedFields: [String]) {
    batchCreateClients(data: $data, mappedFields: $mappedFields)
  }
`;
export const deleteUserData = /* GraphQL */ `
  mutation DeleteUserData {
    deleteUserData
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const deleteGoal = /* GraphQL */ `
  mutation DeleteGoal(
    $input: DeleteGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    deleteGoal(input: $input, condition: $condition) {
      id
      title
      content
      curDate
      timesPerDay
      timesCompleted
      recurring
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
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
          endDate
          notificationId
          type
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
      deal {
        items {
          id
          title
          amount
          stage
          clientId
          createdAt
          updatedAt
          clientDealId
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
export const deleteProperty = /* GraphQL */ `
  mutation DeleteProperty(
    $input: DeletePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    deleteProperty(input: $input, condition: $condition) {
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
          endDate
          notificationId
          type
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
export const deletePropertyGroup = /* GraphQL */ `
  mutation DeletePropertyGroup(
    $input: DeletePropertyGroupInput!
    $condition: ModelPropertyGroupConditionInput
  ) {
    deletePropertyGroup(input: $input, condition: $condition) {
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
export const deleteReminder = /* GraphQL */ `
  mutation DeleteReminder(
    $input: DeleteReminderInput!
    $condition: ModelReminderConditionInput
  ) {
    deleteReminder(input: $input, condition: $condition) {
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
export const deleteClientGroup = /* GraphQL */ `
  mutation DeleteClientGroup(
    $input: DeleteClientGroupInput!
    $condition: ModelClientGroupConditionInput
  ) {
    deleteClientGroup(input: $input, condition: $condition) {
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
export const deleteConnectionHistory = /* GraphQL */ `
  mutation DeleteConnectionHistory(
    $input: DeleteConnectionHistoryInput!
    $condition: ModelConnectionHistoryConditionInput
  ) {
    deleteConnectionHistory(input: $input, condition: $condition) {
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
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
      id
      clientId
      propertyId
      title
      content
      completed
      date
      endDate
      notificationId
      type
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      title
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateDeal = /* GraphQL */ `
  mutation UpdateDeal(
    $input: UpdateDealInput!
    $condition: ModelDealConditionInput
  ) {
    updateDeal(input: $input, condition: $condition) {
      id
      title
      amount
      stage
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
      createdAt
      updatedAt
      clientDealId
      owner
    }
  }
`;
export const deleteDeal = /* GraphQL */ `
  mutation DeleteDeal(
    $input: DeleteDealInput!
    $condition: ModelDealConditionInput
  ) {
    deleteDeal(input: $input, condition: $condition) {
      id
      title
      amount
      stage
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
      createdAt
      updatedAt
      clientDealId
      owner
    }
  }
`;
export const updateGroupsClients = /* GraphQL */ `
  mutation UpdateGroupsClients(
    $input: UpdateGroupsClientsInput!
    $condition: ModelGroupsClientsConditionInput
  ) {
    updateGroupsClients(input: $input, condition: $condition) {
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
export const deleteGroupsClients = /* GraphQL */ `
  mutation DeleteGroupsClients(
    $input: DeleteGroupsClientsInput!
    $condition: ModelGroupsClientsConditionInput
  ) {
    deleteGroupsClients(input: $input, condition: $condition) {
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
export const updateGroupsProperty = /* GraphQL */ `
  mutation UpdateGroupsProperty(
    $input: UpdateGroupsPropertyInput!
    $condition: ModelGroupsPropertyConditionInput
  ) {
    updateGroupsProperty(input: $input, condition: $condition) {
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
export const deleteGroupsProperty = /* GraphQL */ `
  mutation DeleteGroupsProperty(
    $input: DeleteGroupsPropertyInput!
    $condition: ModelGroupsPropertyConditionInput
  ) {
    deleteGroupsProperty(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const createGoal = /* GraphQL */ `
  mutation CreateGoal(
    $input: CreateGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    createGoal(input: $input, condition: $condition) {
      id
      title
      content
      curDate
      timesPerDay
      timesCompleted
      recurring
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateGoal = /* GraphQL */ `
  mutation UpdateGoal(
    $input: UpdateGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    updateGoal(input: $input, condition: $condition) {
      id
      title
      content
      curDate
      timesPerDay
      timesCompleted
      recurring
      owner
      createdAt
      updatedAt
    }
  }
`;
export const createClient = /* GraphQL */ `
  mutation CreateClient(
    $input: CreateClientInput!
    $condition: ModelClientConditionInput
  ) {
    createClient(input: $input, condition: $condition) {
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
          endDate
          notificationId
          type
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
      deal {
        items {
          id
          title
          amount
          stage
          clientId
          createdAt
          updatedAt
          clientDealId
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
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
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
          endDate
          notificationId
          type
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
      deal {
        items {
          id
          title
          amount
          stage
          clientId
          createdAt
          updatedAt
          clientDealId
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
export const createProperty = /* GraphQL */ `
  mutation CreateProperty(
    $input: CreatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    createProperty(input: $input, condition: $condition) {
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
          endDate
          notificationId
          type
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
export const updateProperty = /* GraphQL */ `
  mutation UpdateProperty(
    $input: UpdatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    updateProperty(input: $input, condition: $condition) {
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
          endDate
          notificationId
          type
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
export const createPropertyGroup = /* GraphQL */ `
  mutation CreatePropertyGroup(
    $input: CreatePropertyGroupInput!
    $condition: ModelPropertyGroupConditionInput
  ) {
    createPropertyGroup(input: $input, condition: $condition) {
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
export const updatePropertyGroup = /* GraphQL */ `
  mutation UpdatePropertyGroup(
    $input: UpdatePropertyGroupInput!
    $condition: ModelPropertyGroupConditionInput
  ) {
    updatePropertyGroup(input: $input, condition: $condition) {
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
export const updateReminder = /* GraphQL */ `
  mutation UpdateReminder(
    $input: UpdateReminderInput!
    $condition: ModelReminderConditionInput
  ) {
    updateReminder(input: $input, condition: $condition) {
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
export const createClientGroup = /* GraphQL */ `
  mutation CreateClientGroup(
    $input: CreateClientGroupInput!
    $condition: ModelClientGroupConditionInput
  ) {
    createClientGroup(input: $input, condition: $condition) {
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
export const updateClientGroup = /* GraphQL */ `
  mutation UpdateClientGroup(
    $input: UpdateClientGroupInput!
    $condition: ModelClientGroupConditionInput
  ) {
    updateClientGroup(input: $input, condition: $condition) {
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
export const createConnectionHistory = /* GraphQL */ `
  mutation CreateConnectionHistory(
    $input: CreateConnectionHistoryInput!
    $condition: ModelConnectionHistoryConditionInput
  ) {
    createConnectionHistory(input: $input, condition: $condition) {
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
export const updateConnectionHistory = /* GraphQL */ `
  mutation UpdateConnectionHistory(
    $input: UpdateConnectionHistoryInput!
    $condition: ModelConnectionHistoryConditionInput
  ) {
    updateConnectionHistory(input: $input, condition: $condition) {
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
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
      id
      clientId
      propertyId
      title
      content
      completed
      date
      endDate
      notificationId
      type
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
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
      id
      clientId
      propertyId
      title
      content
      completed
      date
      endDate
      notificationId
      type
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
export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      title
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      title
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
export const createDeal = /* GraphQL */ `
  mutation CreateDeal(
    $input: CreateDealInput!
    $condition: ModelDealConditionInput
  ) {
    createDeal(input: $input, condition: $condition) {
      id
      title
      amount
      stage
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
      createdAt
      updatedAt
      clientDealId
      owner
    }
  }
`;
export const createGroupsClients = /* GraphQL */ `
  mutation CreateGroupsClients(
    $input: CreateGroupsClientsInput!
    $condition: ModelGroupsClientsConditionInput
  ) {
    createGroupsClients(input: $input, condition: $condition) {
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
export const createGroupsProperty = /* GraphQL */ `
  mutation CreateGroupsProperty(
    $input: CreateGroupsPropertyInput!
    $condition: ModelGroupsPropertyConditionInput
  ) {
    createGroupsProperty(input: $input, condition: $condition) {
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
