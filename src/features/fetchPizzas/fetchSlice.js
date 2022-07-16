import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pizzas: [],
  status: 'loading' // loading | success | error
};

export const fetchPizzas = createAsyncThunk("pizzas/fetchPizzas",
     async (params) => {
        const { queryCategory, querySort, sortBehave } = params
        const { data } = await axios.get(
            "https://62c867ac8c90491c2cb52f2d.mockapi.io/items?" +
            queryCategory +
            querySort +
            `&order=${sortBehave ? "desc" : "asc"}`
        );
        return data 
});


export const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers:{
    [fetchPizzas.pending]: (state)=>{
      state.status = 'loading'
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state,action) =>{
        state.pizzas = action.payload
        state.status = 'success'
    },
    [fetchPizzas.rejected]: (state) =>{
      state.status = 'error'
      state.items  = []
    }
  }
});

export const getPizzas = (state) => state.fetchPizzas.pizzas
export const getStatus = (state) => state.fetchPizzas.status

// export const {} = pizzaSlice.actions;

export default pizzaSlice.reducer;
