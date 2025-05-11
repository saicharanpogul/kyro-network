import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getUser = query({
  args: {
    address: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.address) {
      return await ctx.db
        .query("users")
        .withIndex("by_address", (q) => q.eq("address", String(args.address)))
        .first();
    } else {
      return await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", String(args.email)))
        .first();
    }
  },
});

export const createUser = mutation({
  args: {
    address: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    profile: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Use the index to efficiently check for existing user
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_address", (q) => q.eq("address", args.address))
      .collect();

    if (existingUser.length > 0) {
      // Do not insert if user already exists
      return;
    }

    // Insert new user
    await ctx.db.insert("users", {
      address: args.address,
      email: args.email || "",
      name: args.name || "John Doe",
      profile: args.profile || "",
      points: 0,
    });
  },
});
