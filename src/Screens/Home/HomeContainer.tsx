import { Home } from "./Home";
import React, { useState, useEffect } from "react";
import { useViewProfileQuery } from "@/Services";

export const HomeContainer = () => {
  const { data, isLoading } = useViewProfileQuery();

  return <Home data={data} isLoading={isLoading} />;
};
