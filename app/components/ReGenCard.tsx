export default function ReGenCard({
  points,
  wasteSaved,
}: {
  points: number;
  wasteSaved: string;
}) {
  return (
    <div className="bg-card rounded-xl p-6 text-center">
      <p className="text-3xl font-bold">{points}</p>
      <p className="text-sm text-popover-foreground">ReGen Points</p>
      <p className="text-xs mt-2 text-popover-foreground">
        {wasteSaved} waste saved
      </p>
    </div>
  );
}
