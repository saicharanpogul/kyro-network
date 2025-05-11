import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
  points: number;
  isDisabled?: boolean;
}

export default function RewardItem({
  title,
  description,
  points,
  isDisabled = false,
}: Props) {
  return (
    <div className="border rounded-lg p-4 space-y-2 bg-card">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <p className="text-sm text-muted-foreground">{points} points</p>
      </div>
      <Button className="w-full" variant={"secondary"} disabled={isDisabled}>
        Redeem
      </Button>
    </div>
  );
}
