import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    totalPrice:0,
    pizzas:[],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
   setPizza(state,actions){
    const checkedPizzas = state.pizzas.findIndex((pizza) => pizza.id === actions.payload.id);
    checkedPizzas !== -1 
    ? state.pizzas[checkedPizzas].count++ :
    state.pizzas.push({...actions.payload, count:1})
    state.totalPrice = state.pizzas.reduce((prev,cur)=> prev+ cur.price * cur.count,0)
   },
   addCount(state,actions){
    state.pizzas[actions.payload].count++
    state.totalPrice+=state.pizzas[actions.payload].price
   },
   removeCount(state,actions){
    if(state.pizzas[actions.payload].count === 1){
        state.totalPrice-=state.pizzas[actions.payload].price
        const pizzas = state.pizzas.filter((_,index) => index !== actions.payload)
        state.pizzas = pizzas 
    }else{
        state.pizzas[actions.payload].count--
        state.totalPrice-=state.pizzas[actions.payload].price
    }
   },
   clearCart(state){
    state.pizzas = []
    state.totalPrice = 0
   },
   deletePizza(state,actions){
    state.totalPrice-=state.pizzas[actions.payload.index].price * actions.payload.count
    const pizzas = state.pizzas.filter((_,index) => index !== actions.payload.index)
    state.pizzas = pizzas 

   }
  },
});


export const getPizzas = (state) => state.cart.pizzas 
export const getTotalBuy = (state) =>state.cart.pizzas.length
export const getTotalPrice = (state) =>state.cart.totalPrice
export const { setPizza, addCount, removeCount,clearCart,deletePizza } = cartSlice.actions



export default cartSlice.reducer