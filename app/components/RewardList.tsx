import RewardItem from "./RewardItem";

const rewards = [
  {
    title: "₹50 off at LocalMart",
    description: "Valid at all stores",
    points: 50,
  },
  {
    title: "10% off Electronics Repair",
    description: "At authorized centers",
    points: 100,
  },
];

export default function RewardList() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Available Rewards</h2>
      {rewards.map((r, i) => (
        <RewardItem key={i} {...r} />
      ))}
    </div>
  );
}
