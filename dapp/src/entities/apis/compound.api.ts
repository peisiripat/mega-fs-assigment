"use client";
import { ethers } from "ethers";
import { CompoundComptrollerItem } from "../types/compound.type";
import { COMPOUND_ADDR } from "../constants/compound";

import CTokenABI from "../abis/CTokenABI.json";
import ComptrollerABI from "../abis/ComptrollerABI.json";
import ContractABI from "../abis/ContractABI.json";
import { calcUtilization } from "@/utils/compound.util";

export async function getTokenBalance(tokenAddr: string) {
  if (typeof window?.ethereum !== "undefined") {
    const oneEighteen = BigInt("1000000000000000000");
    const oneTen = BigInt("10");

    const blocksPerYear = (365 * 24 * 60 * 60) / 13.3; // Approximately 2371721.80451 blocks per year

    const provider = new ethers.BrowserProvider(window.ethereum, "any");
    const contract = new ethers.Contract(tokenAddr, CTokenABI, provider);
    console.log(contract);
    const totalBorrows = await contract.totalBorrows();
    const totalSupply = await contract.totalSupply();
    const totalReserves = await contract.totalReserves();
    const decimals = await contract.decimals();
    const symbol = await contract.symbol();
    const supplyBalance = await contract.balanceOf(tokenAddr);
    const cash = await contract.getCash();

    const exchangeRateStored = await contract.exchangeRateStored();
    const borrowRatePerBlock = await contract.borrowRatePerBlock();
    const supplyRatePerBlock = await contract.supplyRatePerBlock();

    const annualBorrowRate =
      (1 + Number(borrowRatePerBlock) / 1e18) ** blocksPerYear - 1;

    const annualSupplyRate =
      (1 + Number(supplyRatePerBlock) / 1e18) ** blocksPerYear - 1;

    const exchangeRate = exchangeRateStored / oneEighteen;

    const initialValue = totalSupply / oneTen ** decimals;
    const totalValue = initialValue * exchangeRate;

    const totalInterest = totalValue - initialValue;
    const totalReservesConverted = totalReserves / oneEighteen;
    const totalEarnings = totalInterest - totalReservesConverted;
    // const interestEarned =
    //   BigInt((
    //     calcUtilization(
    //       String(cash),
    //       String(totalBorrows),
    //       String(totalReserves)
    //     )
    //   )) * cash;
    // const interestPaid = totalSupply - cash;
    // const totalEarnings = Number(interestEarned) - interestPaid - totalReserves;

    return {
      // symbol: symbol,
      name: symbol,
      totalBorrows: ethers.formatEther(totalBorrows),
      totalSupply: ethers.formatEther(totalSupply),
      supplyBalance: ethers.formatEther(supplyBalance),
      totalReserves: ethers.formatEther(totalReserves),
      cash: ethers.formatEther(cash),
      exchangeRate: exchangeRate.toString(),

      totalEarnings: totalEarnings.toString(),
      supplyRatePerBlock: supplyRatePerBlock.toString(),
      borrowRatePerBlock: borrowRatePerBlock.toString(),
      earnedARP: (annualSupplyRate * 100).toString(),
      decimals: String(decimals),
      supplyAPY: (annualSupplyRate * 100).toFixed(2).toString(),
      borrowAPY: (annualBorrowRate * 100).toFixed(2).toString(),

      // totalBalanceParsed: ethers.formatUnits(totalBalance, decimals),
      // decimals: decimals.toString(),
    } as CompoundComptrollerItem;
  } else {
    console.error("MetaMask is not installed");
  }
  return {
    name: "",
    totalBorrows: "",
    totalSupply: "",
    supplyBalance: "",
    // totalBalanceParsed: ethers.formatUnits(totalBalance, decimals),
    // decimals: decimals.toString(),
  } as CompoundComptrollerItem;
}
