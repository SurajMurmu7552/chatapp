import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contactName: null,
    contactId: null,
  },
  reducers: {
    addContact: (state, { payload }) => {
      state.contactId = payload.contactId;
      state.contactName = payload.contactName;
    },
    removeContact: (state) => {
      state.contactId = null;
      state.contactName = null;
    },
  },
});

export const { addContact, removeContact } = contactSlice.actions;

export default contactSlice.reducer;
