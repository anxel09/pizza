import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../features/cart/cartSlice'
import filterSlice from '../features/filter/filterSlice'

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
  },
})