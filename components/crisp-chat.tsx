"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("cb438908-b72b-4dd0-9a8d-e29b82b4592e");
  }, []);

  return null;
};

