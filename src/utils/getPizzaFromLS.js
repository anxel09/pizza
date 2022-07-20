export function getPizzaFromLS(){
  return JSON.parse(localStorage.getItem("pizza"))
}