"use client";

import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import ProgressBar from "./ProgressBar";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Suspense fallback={null}>
        <ProgressBar />
      </Suspense>
      {children}
    </SessionProvider>
  );
}
