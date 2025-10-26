import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Mail, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Officials() {
  const { data: officials, isLoading } = useQuery({
    queryKey: ["officials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("officials")
        .select("*")
        .eq("is_active", true)
        .order("position", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Barangay Officials</h1>
            <p className="text-muted-foreground">Manage barangay officials</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Official
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading officials...</div>
        ) : officials && officials.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {officials.map((official) => (
              <Card key={official.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={official.photo_url || ""} alt={official.name} />
                      <AvatarFallback className="text-2xl">
                        {official.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{official.name}</h3>
                      <p className="text-sm text-primary font-medium">{official.position}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(official.term_start).getFullYear()} - 
                        {official.term_end ? new Date(official.term_end).getFullYear() : "Present"}
                      </p>
                    </div>
                    <div className="w-full space-y-2 text-sm">
                      {official.email && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{official.email}</span>
                        </div>
                      )}
                      {official.contact_number && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <span>{official.contact_number}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-muted-foreground">
                No officials registered yet.
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
