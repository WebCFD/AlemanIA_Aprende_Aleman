import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Empieza from "@/pages/Empieza";
import Videos from "@/pages/Videos";
import QuienesSomos from "@/pages/QuienesSomos";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

function Navigation() {
  const [location, navigate] = useLocation();
  
  const isActive = (path: string) => {
    return location === path;
  };
  
  return (
    <div className="bg-white mb-6">
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex justify-center md:justify-end space-x-2 md:space-x-4 overflow-x-auto">
          <button 
            onClick={() => navigate("/")}
            className={cn(
              "px-2 md:px-4 py-3 text-xs md:text-sm font-medium transition-colors whitespace-nowrap",
              isActive("/") 
                ? "text-[#4A6FA5] border-t-2 border-[#4A6FA5]" 
                : "text-gray-600 hover:text-[#4A6FA5]"
            )}
          >
            Aprende
          </button>
          <button 
            onClick={() => navigate("/empieza")}
            className={cn(
              "px-2 md:px-4 py-3 text-xs md:text-sm font-medium transition-colors whitespace-nowrap",
              isActive("/empieza") 
                ? "text-[#4A6FA5] border-t-2 border-[#4A6FA5]" 
                : "text-gray-600 hover:text-[#4A6FA5]"
            )}
          >
            Empieza de 0
          </button>
          <button 
            onClick={() => navigate("/videos")}
            className={cn(
              "px-2 md:px-4 py-3 text-xs md:text-sm font-medium transition-colors whitespace-nowrap",
              isActive("/videos") 
                ? "text-[#4A6FA5] border-t-2 border-[#4A6FA5]" 
                : "text-gray-600 hover:text-[#4A6FA5]"
            )}
          >
            Videos
          </button>
          <button 
            onClick={() => navigate("/quienes-somos")}
            className={cn(
              "px-2 md:px-4 py-3 text-xs md:text-sm font-medium transition-colors whitespace-nowrap",
              isActive("/quienes-somos") 
                ? "text-[#4A6FA5] border-t-2 border-[#4A6FA5]" 
                : "text-gray-600 hover:text-[#4A6FA5]"
            )}
          >
            Quienes Somos
          </button>
        </nav>
      </div>
    </div>
  );
}

function Router() {
  return (
    <>
      <Header />
      <Navigation />
      <main className="min-h-[calc(100vh-220px)]">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/empieza" component={Empieza} />
          <Route path="/videos" component={Videos} />
          <Route path="/quienes-somos" component={QuienesSomos} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;