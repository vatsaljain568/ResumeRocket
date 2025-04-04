import React from "react";
import { Header } from "../components/Header";
import { HowItWorks } from "../components/HowItWorks";

export default function HowItWorksPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main>
        <HowItWorks />
      </main>
    </div>
  );
}