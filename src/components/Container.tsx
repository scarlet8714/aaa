import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex justify-center">{children}</div>;
}
