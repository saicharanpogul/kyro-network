import RewardItem from "./RewardItem";

const rewards = [
  {
    title: "Rewards Claiming",
    description: " Coming Soon...",
    points: 0,
    isDisabled: true,
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
