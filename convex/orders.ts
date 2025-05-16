import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getUserOrder = query({
  args: {
    orderId: v.id("orders"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_id", (q) => q.eq("_id", args.orderId))
      .collect();
  },
});

export const getUserOrders = query({
  args: {
    user: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    if (args.user) {
      return await ctx.db
        .query("orders")
        .withIndex("by_user", (q) => q.eq("user", args.user as Id<"users">))
        .collect();
    } else {
      return [];
    }
  },
});

export const createOrder = mutation({
  args: {
    user: v.optional(v.id("users")),
    product: v.string(),
    pickupTime: v.number(),
  },
  handler: async (ctx, args) => {
    if (args.user) {
      await ctx.db.insert("orders", {
        user: args.user,
        product: args.product,
        pickupTime: args.pickupTime,
        status: "processing",
        points: 10,
      });
    }
  },
});
