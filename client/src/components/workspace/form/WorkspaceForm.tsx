/**
 * Node modules
 */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Components
 */
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const WorkspaceForm = () => {
  const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Workspace name is required",
    }),
    description: z.string().trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="grid grid-cols-2">
      <div className="flex h-[600px] flex-col space-y-5 p-10">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Let's build a Workspace
          </h1>
          <p className="text-muted-foreground leading-tight">
            Boost your productivity by making it easier for everyone to access
            projects in one location.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col justify-between"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Workspace name</FormLabel>
                    <FormControl>
                      <Input autoFocus placeholder="Taco's Co." {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of your company, team or organization.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm">
                      Workspace description
                      <span className="mt-1 ml-2 text-xs font-extralight">
                        Optional
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-44 resize-none"
                        placeholder="Our team organizes marketing projects and tasks here."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Get your members on board with a few words about your
                      Workspace.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full">Create Workspace</Button>
          </form>
        </Form>
      </div>
      <div className="bg-muted">
        <img
          src="/images/workspace.jpg"
          alt=""
          className="h-[600px] w-full object-cover"
        />
      </div>
    </div>
  );
};

export default WorkspaceForm;
