import { configureStore } from '@reduxjs/toolkit';

import booksReducer from '../store/book'
import customersReducer from '../store/user'
import borrowsReducer from '../store/borrow'
import dashboardsReducer from '../store/dashboard'

export const store = configureStore({
  reducer: {
    books: booksReducer,
    customers:customersReducer,
    borrows:borrowsReducer,
    dashboards:dashboardsReducer,
  },
});
