import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Complaints() {
  const { data: complaints, isLoading } = useQuery({
    queryKey: ["complaints"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .order("filed_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/10 text-warning";
      case "in_progress":
        return "bg-accent/10 text-accent";
      case "resolved":
        return "bg-success/10 text-success";
      case "closed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Complaints</h1>
            <p className="text-muted-foreground">Manage resident complaints</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            File Complaint
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading complaints...</div>
            ) : complaints && complaints.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium">Complainant</th>
                      <th className="text-left p-3 font-medium">Type</th>
                      <th className="text-left p-3 font-medium">Description</th>
                      <th className="text-left p-3 font-medium">Filed Date</th>
                      <th className="text-left p-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((complaint) => (
                      <tr key={complaint.id} className="border-b border-border hover:bg-muted/50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{complaint.complainant_name}</p>
                            {complaint.complainant_contact && (
                              <p className="text-xs text-muted-foreground">
                                {complaint.complainant_contact}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-3">{complaint.complaint_type}</td>
                        <td className="p-3 max-w-xs truncate">{complaint.description}</td>
                        <td className="p-3">
                          {new Date(complaint.filed_date).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                            {complaint.status.replace("_", " ")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No complaints filed yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
