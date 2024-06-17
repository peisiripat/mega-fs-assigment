import {
  CompoundComptrollerItem,
  CompoundItem,
} from "@/entities/types/compound.type";
import { ethers } from "ethers";

// export function calcUtilization(totalBorrow: string, totalSupply: string) {
//   const numTotalBorrow = Number(totalBorrow);
//   const numTotalSupply = Number(totalSupply);
//   if (numTotalSupply === 0) return 0;
//   return (numTotalBorrow / numTotalSupply) * 100;
// }
export function calcUtilization(
  cash: string,
  totalBorrows: string,
  totalReserves: string
) {
  // Calculate utilization rate
  const utilizationRate =
    (Number(totalBorrows) * 10000) /
    (Number(cash) + Number(totalBorrows) - Number(totalReserves));

  // Format and return as percentage string
  const utilizationPercentage = (utilizationRate / 100).toFixed(2);
  return utilizationPercentage + "%";
}

export function calcSupplyAPY(dataList: CompoundComptrollerItem[]) {}

export function calcBorrowAPY(dataList: CompoundComptrollerItem[]) {}

export function convertToMillions(value: string): string {
  const number = Number(value);
  if (number < 1000000) return number.toFixed(2).toString();
  // Divide by 1,000,000 to get millions
  const inMillions = number / 1000000;

  // Format to two decimal places
  const formattedValue = inMillions.toFixed(2);

  // Append 'M' for millions
  return `${formattedValue}M`;
}

export function convertEarnings(value: string) {
  const num = Number(value);
  let parts = num.toString().split(".");

  // Extract integer and decimal parts
  let integerPart = parts[0];
  let decimalPart = parts.length > 1 ? parts[1] : "00";

  decimalPart =
    decimalPart.length >= 2
      ? decimalPart.slice(0, 2)
      : decimalPart.padEnd(2, "0");

  // Construct the formatted number
  let formattedNumber = integerPart + "." + decimalPart;

  // Return the formatted number as a string
  return formattedNumber;
}
