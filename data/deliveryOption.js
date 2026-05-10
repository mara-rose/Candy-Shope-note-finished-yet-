import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    price: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    price: 500,
  },
  {
    id: "3",
    deliveryDays: 1,
    price: 700,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let matchingDeliveryOption;
  deliveryOptions.forEach((Option) => {
    if (Option.id === deliveryOptionId) {
      matchingDeliveryOption = Option;
    }
  });
  return matchingDeliveryOption || deliveryOptions[0];
}


export function calculateDeliveryDate(matchingDeliveryOption){
   let deliveryDate = dayjs();
   let remainingDays= matchingDeliveryOption.deliveryDays;
    while(remainingDays>0){
     deliveryDate = deliveryDate.add(1,'day');
     if(!isWeekend(deliveryDate)){
      remainingDays--;
     }
    } 
   const dateString = deliveryDate.format("dddd, MMMM D");
   return dateString;
}
function isWeekend(today){
  const dayOfWeek = today.format('dddd');
  return dayOfWeek === 'Friday' || dayOfWeek === 'Saturday';
}