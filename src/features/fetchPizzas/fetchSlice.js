import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pizzas: [],
  pizzaById:{},
  status: "loading" // loading | success | error
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

export const fetchPizzaById = createAsyncThunk("pizzas/getPizzaById",
  async (id,{rejectWithValue}) =>{
    try{
      const {data} = await axios.get(
        `https://62c867ac8c90491c2cb52f2d.mockapi.io/items?id=${id}`
      ) 
      if(data.length < 1){
        return rejectWithValue({})
      }
      return data

    }catch(err){
      console.log("Не смогли найти пиццу!")
    }
  }
)



export const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    clearPizzaById(state){
      state.pizzaById = {}
    }
  },
  extraReducers:{
    [fetchPizzas.pending]: (state)=>{
      state.status = "loading" 
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state,action) =>{
      state.pizzas = action.payload
      state.status = "success"
    },
    [fetchPizzas.rejected]: (state) =>{
      state.status = "error"
      state.items  = []
    },
    [fetchPizzaById.pending]: (state) =>{
      state.status = "loading"
      state.pizzaById = {}
    },
    [fetchPizzaById.fulfilled]: (state,action) =>{
      state.status = "success"
      state.pizzaById = action.payload
    },
    [fetchPizzaById.rejected]: (state) =>{
      state.pizzaById  = {}
      state.status = "error"
    },
  }
});

export const getPizzas = (state) => state.fetchPizzas.pizzas
export const getPizzaById = (state) => (state.fetchPizzas.pizzaById)
export const getStatus = (state) => state.fetchPizzas.status


export const { clearPizzaById } = pizzaSlice.actions;

export default pizzaSlice.reducer;
