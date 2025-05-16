import { useEffect, useState } from "react";
import ActivityItem from "./ActivityItem";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
// import useWeb3Auth from "../hooks/useWeb3Auth";
import { useCivicAuth } from "../contexts/CivicAuthContext";

export default function ActivityList() {
  const [activities, setActivities] = useState<
    Array<{
      title: string;
      points: number;
      date: string;
      status: string;
    }>
  >([
    // { title: "iPhone Recycled", points: 100, date: "2025-05-01" },
    // { title: "Cables Recycled", points: 50, date: "2025-04-30" },
  ]);
  // const { user } = useWeb3Auth();
  const { user } = useCivicAuth();
  const userData = useQuery(api.users.getUser, { email: user?.user.email });
  const orders = useQuery(api.orders.getUserOrders, { user: userData?._id });

  useEffect(() => {
    if (orders) {
      const mappedActivities = orders.map((order) => ({
        title: order.product,
        points: order.points,
        date: new Date(order.pickupTime).toISOString().split("T")[0], // format as YYYY-MM-DD
        status: order.status,
      }));
      setActivities(mappedActivities);
    }
  }, [orders, user]);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Recent Activity</h2>
      {activities.length > 0 ? (
        activities.map((a, i) => <ActivityItem key={i} {...a} />)
      ) : (
        <div className="text-sm text-muted-foreground text-center">
          No activities yet.
        </div>
      )}
    </div>
  );
}
