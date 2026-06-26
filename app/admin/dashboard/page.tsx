import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Puzzle, Users, Trophy, Activity } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Puzzles",
      value: "12",
      description: "+2 from last month",
      icon: Puzzle,
    },
    {
      title: "Total Entries",
      value: "1,234",
      description: "+180 this week",
      icon: Users,
    },
    {
      title: "Winners Declared",
      value: "45",
      description: "Across all puzzles",
      icon: Trophy,
    },
    {
      title: "Active Players",
      value: "573",
      description: "Currently playing",
      icon: Activity,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's a quick overview of your crossword game statistics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-slate-400 bg-slate-50 rounded-md border border-dashed border-slate-200">
              Activity Chart Placeholder
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
             <div className="h-[200px] flex items-center justify-center text-slate-400 bg-slate-50 rounded-md border border-dashed border-slate-200">
              Actions List Placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
