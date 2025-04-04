import React from "react";
import { Header } from "../components/Header";
import { Examples } from "../components/Examples";

export default function ExamplesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main>
        <Examples />
      </main>
    </div>
  );
}