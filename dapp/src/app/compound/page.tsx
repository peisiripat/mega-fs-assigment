"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { getTokenBalance } from "@/entities/apis/compound.api";
import { Button, LinearProgress } from "@mui/material";
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
  const [account, setAccount] = useState("");

  const [pool, setPool] = useState("cETH"); // Default pool example: cETH
  const [totalSupply, setTotalSupply] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { results, isLoading } = useCompoundListingPage();

  return (
    <>
      <ConnectButton />
      {console.log(results)}
      <ListingTable
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
                calcUtilization(
                  cell.cash,
                  cell.totalBorrows,
                  cell.totalReserves
                ),
            },
            { Header: "Supply APY" },
            { Header: "Borrow APY" },

            {
              Header: "Total Supply (Total Earning)",
              Cell: (cell) =>
                `${convertToMillions(cell.totalEarnings) + "\t" + cell.name}`,
              // Cell: (cell) => Number(cell.totalSupply) - Number(cell.cash),
            },
            {
              Header: "Total Borrow",
              Cell: (cell) =>
                `${convertToMillions(cell.totalBorrows) + "\t" + cell.name}`,
            },
          ],
        }}
      />
    </>
  );
};
export default CompoundPage;
