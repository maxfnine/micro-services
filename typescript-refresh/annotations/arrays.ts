const carMakers = ["ford", "toyota", "chevy"];
const dates = [new Date(), new Date()];

const carsByMake = [["f150"], ["corolla"], ["camaro"]];

//Help with inference when extracting values
const car = carMakers[0];
const myCar = carMakers.pop();

//prevent incompatible values
carMakers.push(100);

//help with map
carMakers.map((car: string): string => car.toUpperCase());

//flexible types
const importantDates: (Date | string | number)[] = [];
importantDates.push("2020-10-15");
importantDates.push(new Date());
