"use client";
import React, { useState, useEffect, useCallback } from "react";
import { getTokenBalance } from "@/entities/apis/compound.api";
import { CTOKENS_ADDR_DICT } from "@/entities/constants/compound";
import { CompoundComptrollerItem } from "@/entities/types/compound.type";
import { setServers } from "dns";

export function useCompoundListingPage(tokenList?: string) {
  const [results, setResults] = useState<CompoundComptrollerItem[]>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const tokenName = Object.keys(CTOKENS_ADDR_DICT) as Array<
    keyof typeof CTOKENS_ADDR_DICT
  >;

  const promises: Promise<CompoundComptrollerItem>[] = [];
  tokenName.forEach((token, idx) => {
    promises.push(getTokenBalance(CTOKENS_ADDR_DICT[token]));
  });

  useEffect(() => {
    Promise.all(promises)
      .catch((err) => {
        return Promise.reject(err);
      })
      .then((res) => {
        setResults(res);
        return res;
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { name: tokenName, results: results, isLoading: isLoading };
}
