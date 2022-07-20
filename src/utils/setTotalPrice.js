export function setTotalPrice(){
  const data = JSON.parse(localStorage.getItem("pizza"))
  console.log(data)
  const price = data?.reduce((prev,cur)=> prev+cur.price * cur.count,0) || 0;
  console.log(price)
  return price
}