"use client";
import { ethers } from "ethers";
import { CompoundComptrollerItem } from "../types/compound.type";
import { COMPOUND_ADDR } from "../constants/compound";

import CTokenABI from "../abis/CTokenABI.json";
import ComptrollerABI from "../abis/ComptrollerABI.json";
import ContractABI from "../abis/ContractABI.json";

export async function getTokenBalance(tokenAddr: string) {
  if (typeof window?.ethereum !== "undefined") {
    const oneEighteen = BigInt("1000000000000000000");
    const oneTen = BigInt("10");
    const oneSix = BigInt("1000000");
    const oneE18 = 1n * 10n ** 18n;

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
    const earnAPR =
      (annualBorrowRate * Number(totalBorrows)) /
      Number(totalSupply + totalReserves);
    const earnAPRPercentage = earnAPR * 100;

    // const exchangeRate = Number(exchangeRateStored / oneEighteen);

    // const initialValue = Number(totalSupply) / 10 ** Number(decimals);
    // const totalValue =
    //   (Number(totalSupply) / 10 ** Number(decimals)) * exchangeRate;

    // const totalInterest = totalValue - initialValue;
    // const totalReservesConverted = Number(totalReserves / oneEighteen);
    // const totalEarnings = totalInterest - totalReservesConverted;

    const exchangeRate = exchangeRateStored / oneEighteen;

    const initialValue = totalSupply / oneTen ** decimals;
    const totalValue = initialValue * exchangeRate;

    const totalInterest = totalValue - initialValue;
    const totalReservesConverted = totalReserves / oneEighteen;
    const totalEarnings = totalInterest - totalReservesConverted;

    console.log(totalEarnings);

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
      earnedARP: earnAPRPercentage.toString(),

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

export async function getTokenData(tokenAddr: string) {
  return {
    name: "",
    totalBorrows: "",
    totalSupply: "",
    supplyBalance: "",
    // totalBalanceParsed: ethers.formatUnits(totalBalance, decimals),
    // decimals: decimals.toString(),
  } as CompoundComptrollerItem;
}

function calculateAPRs(
  borrowRatePerBlock: number,
  supplyRatePerBlock: number,
  totalSupply: number,
  totalBorrows: number,
  totalReserves: number
): { earnAPR: number; borrowAPR: number } {
  // Constants
  const blocksPerYear = (365 * 24 * 60 * 60) / 13.3; // Approximately 2371721.80451 blocks per year

  // Convert supply rate per block to annual rate
  const annualSupplyRate = (1 + supplyRatePerBlock / 1e18) ** blocksPerYear - 1;

  // Convert borrow rate per block to annual rate
  const annualBorrowRate = (1 + borrowRatePerBlock / 1e18) ** blocksPerYear - 1;

  // Calculate Earn APR (Supply APR)
  const earnAPR =
    (annualSupplyRate * totalSupply * 1e18) / (totalBorrows + totalReserves);

  // Calculate Borrow APR
  const borrowAPR =
    (annualBorrowRate * totalBorrows) / (totalSupply + totalReserves);
}

// Given parameters
