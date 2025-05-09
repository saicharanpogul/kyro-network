import ActivityItem from "./ActivityItem";

const activities = [
  { title: "iPhone Recycled", points: 100, date: "2025-05-01" },
  { title: "Cables Recycled", points: 50, date: "2025-04-30" },
];

export default function ActivityList() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Recent Activity</h2>
      {activities.map((a, i) => (
        <ActivityItem key={i} {...a} />
      ))}
    </div>
  );
}
