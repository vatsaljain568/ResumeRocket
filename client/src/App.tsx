import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import PortfolioPage from "@/pages/portfolio";
import HowItWorksPage from "@/pages/how-it-works";
import ExamplesPage from "@/pages/examples";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio/:id" component={PortfolioPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/examples" component={ExamplesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
