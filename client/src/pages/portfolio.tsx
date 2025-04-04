import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../components/Header";
import { PortfolioPreview } from "../components/PortfolioPreview";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Portfolio } from "@shared/schema";

export default function PortfolioPage() {
  const [, params] = useRoute("/portfolio/:id");
  const { toast } = useToast();
  const id = params?.id ? parseInt(params.id) : null;

  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/portfolio/${id}`],
    enabled: id !== null,
  });

  const handleStartOver = () => {
    // Navigate back to home
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !data?.portfolio) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Not Found</h2>
            <p className="mb-8 text-gray-600">
              The portfolio you're looking for could not be found or has been removed.
            </p>
            <Link href="/">
              <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Return to Home
              </a>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PortfolioPreview
          portfolio={data.portfolio.data as Portfolio}
          portfolioId={data.portfolio.id}
          onStartOver={handleStartOver}
        />
      </main>
    </div>
  );
}
