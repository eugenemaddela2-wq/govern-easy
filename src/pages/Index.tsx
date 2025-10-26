import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar, UserCheck, MessageSquare, LayoutDashboard } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const features = [
    {
      icon: Users,
      title: "Resident Management",
      description: "Maintain comprehensive records of all barangay residents",
    },
    {
      icon: FileText,
      title: "Document Issuance",
      description: "Issue and track barangay clearances, certificates, and permits",
    },
    {
      icon: Calendar,
      title: "Event Management",
      description: "Schedule and organize community events and activities",
    },
    {
      icon: UserCheck,
      title: "Officials Directory",
      description: "Keep track of barangay officials and their responsibilities",
    },
    {
      icon: MessageSquare,
      title: "Complaints System",
      description: "Manage and resolve resident complaints efficiently",
    },
    {
      icon: LayoutDashboard,
      title: "Dashboard Analytics",
      description: "View comprehensive statistics and insights at a glance",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-xl bg-primary text-primary-foreground mb-6">
            <span className="text-4xl font-bold">BMS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Barangay Management System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A comprehensive solution for efficient barangay administration and community management
          </p>
          <Button size="lg" onClick={() => navigate("/auth")} className="px-8">
            Get Started
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground">
            Built with modern technology for efficient barangay governance
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
