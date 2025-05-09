interface Props {
  title: string;
  points: number;
  date: string;
}

export default function ActivityItem({ title, points, date }: Props) {
  return (
    <div className="bg-muted rounded-lg p-4 flex flex-col gap-1">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">
        +{points} points • {date}
      </p>
    </div>
  );
}
