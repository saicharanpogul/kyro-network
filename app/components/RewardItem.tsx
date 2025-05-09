import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
  points: number;
}

export default function RewardItem({ title, description, points }: Props) {
  return (
    <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <p className="text-sm text-muted-foreground">{points} points</p>
      </div>
      <Button className="w-full bg-primary text-black hover:bg-black hover:text-primary-foreground">
        Redeem
      </Button>
    </div>
  );
}
