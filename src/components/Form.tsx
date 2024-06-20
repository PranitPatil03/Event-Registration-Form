import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import "../App.css";
import { useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    firstName: z.string().min(4).max(10),
    lastName: z.string().min(4).max(10),
    email: z.string().email("Enter valid email"),
    age: z.number().positive().int().min(1).max(120),
    guestName: z.string().optional(),
    guestType: z.enum(["Yes", "No"], {
      required_error: "Are you attending with a guest?",
    }),
  })
  .refine((data) => data.guestType === "No" || data.guestName, {
    message: "Guest name is required if attending with a guest",
    path: ["guestName"],
  });

export const FormContainer = () => {
  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.guestType === "No") {
      values.guestName = "";
    }

    if (Object.keys(form.formState.errors).length > 0) {
      Object.values(form.formState.errors).forEach((error) => {
        toast({
          title: "Validation Error",
          description: error.message,
          variant: "destructive",
        });
      });
    } else {
      localStorage.setItem("formData", JSON.stringify(values));

      navigate("/registered");
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 0,
      guestName: "",
      guestType: "No",
    },
  });

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full max-w-3xl p-4 sm:p-6 md:p-8 lg:p-10 mx-auto">
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full border shadow-md rounded-md p-4 sm:p-6 md:p-8 lg:p-10"
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex font-mono font-bold text-lg">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex font-mono font-bold text-lg">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 mt-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex font-mono font-bold text-lg">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex font-mono font-bold text-lg">
                    Age
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={120}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-col gap-4 md:gap-6 lg:gap-8 mt-6">
            <FormField
              control={form.control}
              name="guestType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex font-mono font-bold text-lg">
                    Are you attending with a guest?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="No" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("guestType") === "Yes" && (
              <FormField
                control={form.control}
                name="guestName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex font-mono font-bold text-lg">
                      Guest Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <Button
            type="submit"
            className="mt-10 w-full font-mono font-bold text-lg"
          >
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};
