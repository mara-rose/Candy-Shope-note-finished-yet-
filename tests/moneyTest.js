import formtCurrency from "../scripts/utils/money.js";

console.log('test suite : formatCurrency ')

console.log('converts cents into dollars');

if(formtCurrency(2095)==='20.95'){
  console.log('passed');
}else{
  console.log('failed');
}

console.log('works with 0');

if(formtCurrency(0)==='0.00'){
  console.log('passed');
}else{
  console.log('failed');
}

console.log('rounds up to the nearest cent');

if(formtCurrency(2000.5)==='20.01'){
  console.log('passed');
}else{
  console.log('failed');
}

console.log('rounds down to the nearest cent');

if(formtCurrency(2000.4)==='20.00'){
  console.log('passed');
}else{
  console.log('failed');
}