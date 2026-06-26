export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">View player statistics and engagement metrics.</p>
      </div>
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white">
        <p className="text-sm text-muted-foreground">Detailed analytics charts will appear here.</p>
      </div>
    </div>
  );
}
