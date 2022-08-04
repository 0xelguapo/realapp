import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
  name: 'client',
  initialState: {
    name: '',
    company: '',
    email: '',
    notes: '',
    favorite: false,
    phone: [],
    tasks: [],
    connectionHistory: [],
  },
  reducers: {
    
  }
})

export default clientSlice.reducer