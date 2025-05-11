import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    address: v.string(),
    email: v.string(),
    name: v.string(),
    profile: v.string(),
    points: v.number(),
  })
    .index("by_address", ["address"])
    .index("by_email", ["email"]),
  orders: defineTable({
    user: v.id("users"),
    product: v.string(),
    pickupTime: v.number(),
    status: v.string(),
    points: v.number(),
  }).index("by_user", ["user"]),
});
