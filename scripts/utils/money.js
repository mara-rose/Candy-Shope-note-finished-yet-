export function formtCurrency(value){
  return (Math.round(value)/100).toFixed(2);
}
export default formtCurrency;