"use client";

import { Button } from "@/components/ui/button";
import useWeb3Auth from "../hooks/useWeb3Auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import OPTIONS from "../constants/options";
import { useState } from "react";

const FormSchema = z.object({
  item: z.string({
    required_error: "Please select an item to pickup.",
  }),
  pickupDate: z.date({
    required_error: "A pickup date is required.",
  }),
});

export default function SchedulePickup() {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, isAuthenticated, user, login, authenticateUser } =
    useWeb3Auth();
  const createOrderMutation = useMutation(api.orders.createOrder);
  const userData = useQuery(api.users.getUser, { address: user?.address });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await createOrderMutation({
      user: userData?._id,
      pickupTime: data.pickupDate.getTime(),
      product: data.item,
    });
    toast("Pickup Scheduled!");
    setOpen(false);
  }

  const handleLogin = () => login();
  const handleAuth = () => authenticateUser();

  const renderActionButton = () => {
    if (!isLoggedIn) {
      return (
        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
      );
    }

    if (!isAuthenticated) {
      return (
        <Button className="w-full" onClick={handleAuth}>
          Sign
        </Button>
      );
    }

    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Schedule Pickup</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule Pickup</DialogTitle>
              <DialogDescription>
                {`Select the item and schedule your preferred pickup date.`}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <div className="grid gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="item"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <FormLabel htmlFor="name" className="text-right">
                            E-Waste
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <div className="col-span-3">
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select an item" />
                              </SelectTrigger>
                            </div>
                            <SelectContent className="bg-background">
                              <SelectGroup>
                                <SelectLabel>Select e-waste</SelectLabel>
                                {OPTIONS.map((option) => (
                                  <>
                                    <SelectItem value={option.value}>
                                      {option.name}
                                    </SelectItem>
                                  </>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pickupDate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="grid grid-cols-4 items-center gap-4 w-full">
                          <FormLabel htmlFor="username" className="text-right">
                            Pickup Date
                          </FormLabel>

                          <Popover>
                            <PopoverTrigger asChild className="col-span-3">
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[280px] justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-background">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  return <div>{renderActionButton()}</div>;
}
