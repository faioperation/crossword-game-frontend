export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Configure global system preferences.</p>
      </div>
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white">
        <p className="text-sm text-muted-foreground">System settings form will appear here.</p>
      </div>
    </div>
  );
}
