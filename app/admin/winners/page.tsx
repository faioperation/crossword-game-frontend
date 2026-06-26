export default function WinnersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Winner Management</h2>
        <p className="text-muted-foreground">Manage and declare puzzle winners.</p>
      </div>
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white">
        <p className="text-sm text-muted-foreground">Winners list and selection tools will appear here.</p>
      </div>
    </div>
  );
}
