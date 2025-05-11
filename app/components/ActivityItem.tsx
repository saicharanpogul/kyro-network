import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
  points: number;
  date: string;
  status: "processing" | "picked_up" | "completed" | string;
}

export default function ActivityItem({ title, points, date, status }: Props) {
  const badge = () => {
    if (status === "processing") {
      return <Badge className="bg-blue-500">Processing</Badge>;
    }
    if (status === "picked_up") {
      return <Badge className="bg-amber-500">Picked Up</Badge>;
    }
    if (status === "completed") {
      return <Badge className="bg-green-500">Completed</Badge>;
    }
  };
  return (
    <div className="relative bg-card rounded-lg p-4 flex flex-col gap-1">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">
        +{points} points • {date}
      </p>

      <div className="absolute right-4">{badge()}</div>
    </div>
  );
}
