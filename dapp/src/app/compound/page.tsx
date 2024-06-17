"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { getTokenBalance } from "@/entities/apis/compound.api";
import { Button, Chip, LinearProgress, Paper } from "@mui/material";
import {
  CompoundItem,
  CompoundComptrollerItem,
} from "@/entities/types/compound.type";
import ListingTable from "@/shared/ListingTable";
import { CTOKENS_ADDR_DICT } from "@/entities/constants/compound";
import { useCompoundListingPage } from "./page.model";
import {
  calcUtilization,
  convertEarnings,
  convertToMillions,
} from "@/utils/compound.util";

// const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
// await provider.send("eth_requestAccounts", [])
// const signer = provider.getSigner()
// const address = await signer.getAddress()
// const balance = await signer.getBalance()

const CompoundPage = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { results, isLoading } = useCompoundListingPage();

  if (typeof window?.ethereum === "undefined") {
    console.error("MetaMask is not installed");
    return <></>;
  }

  return (
    <Paper sx={{ overflow: "auto" }}>
      <ConnectButton />
      <ListingTable
        sx={{ width: "100%", maxWidth: "100%" }}
        loading={isLoading}
        table={{
          data: results || [],
          columns: [
            {
              Header: "Pool",
              attr: "name",
            },
            {
              Header: "Utilization",
              Cell: (cell) =>
                `${calcUtilization(
                  cell.cash,
                  cell.totalBorrows,
                  cell.totalReserves
                )}%`,
            },
            { Header: "Supply APY", Cell: (cell) => `${cell.supplyAPY}%` },
            { Header: "Borrow APY", Cell: (cell) => `${cell.borrowAPY}%` },

            {
              Header: "Total Supply (Total Earning)",
              Cell: (cell) =>
                Number(cell.totalEarnings) < 0 ? (
                  <Chip color="error" label="bug" />
                ) : (
                  `${cell.totalEarnings}`
                ), // Cell: (cell) => Number(cell.totalSupply) - Number(cell.cash),
            },
            {
              Header: "Total Borrow",
              Cell: (cell) =>
                `${convertToMillions(cell.totalBorrows) + "\t" + cell.name}`,
            },
          ],
        }}
      />
    </Paper>
  );
};
export default CompoundPage;
