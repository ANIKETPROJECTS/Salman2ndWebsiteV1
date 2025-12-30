import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "./pages/Home";
import Competitions from "./pages/Competitions";
import Activities from "./pages/Activities";
import Timeline from "./pages/Timeline";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/not-found";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/competitions" component={Competitions} />
      <Route path="/activities" component={Activities} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      
      {/* Protected Routes */}
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/dashboard/analytics" component={Dashboard} />
      <ProtectedRoute path="/dashboard/students" component={Dashboard} />
      <ProtectedRoute path="/dashboard/competitions" component={Dashboard} />
      <ProtectedRoute path="/dashboard/tasks" component={Dashboard} />
      <ProtectedRoute path="/dashboard/attendance" component={Dashboard} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
