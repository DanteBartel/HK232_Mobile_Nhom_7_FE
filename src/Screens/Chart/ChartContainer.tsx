import { Chart } from "./Chart";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const ChartContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Chart data={data} isLoading={isLoading} />;
};
