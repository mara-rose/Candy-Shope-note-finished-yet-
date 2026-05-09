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
  return matchingDeliveryOption || deliveryOptionId[0];
}
