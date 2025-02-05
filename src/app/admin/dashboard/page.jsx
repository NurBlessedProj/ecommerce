"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/components/Dashboard"; // Your existing Dashboard component

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
};

export default DashboardPage;
