import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const { data: residents } = useQuery({
    queryKey: ["residents-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("residents")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: documents } = useQuery({
    queryKey: ["documents-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("documents")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: events } = useQuery({
    queryKey: ["events-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: complaints } = useQuery({
    queryKey: ["complaints-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("complaints")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const stats = [
    {
      title: "Total Residents",
      value: residents,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Documents Issued",
      value: documents,
      icon: FileText,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Upcoming Events",
      value: events,
      icon: Calendar,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Active Complaints",
      value: complaints,
      icon: MessageSquare,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of barangay management statistics</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`${stat.bgColor} rounded-lg p-2`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value ?? 0}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to Barangay Management System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This system helps manage barangay operations including resident records, document
              issuance, event scheduling, officials management, and complaint tracking.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>View and manage resident information</li>
              <li>Issue and track barangay documents</li>
              <li>Schedule and organize community events</li>
              <li>Maintain barangay officials records</li>
              <li>Handle resident complaints and concerns</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
