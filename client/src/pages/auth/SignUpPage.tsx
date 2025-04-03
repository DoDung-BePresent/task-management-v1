// TODO: Need to improve UI design
/**
 * Node modules
 */
import { z } from "zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Components
 */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Logo from "@/components/Logo";
import { Input } from "@/components/ui/input";
import GoogleOauthButton from "@/components/GoogleOAuthButton";

/**
 * Hooks
 */
import { useAuth } from "@/hooks/useAuth";

/**
 * Constants
 */
import { AUTH_MESSAGES } from "@/constants/messages";

const SignUpPage = () => {
  const { register } = useAuth();

  const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: AUTH_MESSAGES.VALIDATION.NAME_REQUIRED,
    }),
    email: z
      .string()
      .trim()
      .email(AUTH_MESSAGES.VALIDATION.EMAIL_INVALID)
      .min(1, {
        message: AUTH_MESSAGES.VALIDATION.EMAIL_REQUIRED,
      }),
    password: z.string().trim().min(1, {
      message: AUTH_MESSAGES.VALIDATION.PASSWORD_REQUIRED,
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    register.mutate(values);
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Link to="/" className="flex items-center gap-2 self-center font-medium">
        <Logo />
        Team Sync.
      </Link>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create an account</CardTitle>
            <CardDescription>
              Signup with your Email or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <div className="flex flex-col gap-4">
                    <GoogleOauthButton label="Signup" />
                  </div>
                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-background text-muted-foreground relative z-10 px-2">
                      Or continue with
                    </span>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Joh Doe" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="m@example.com" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                              Password
                            </FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      disabled={register.isPending}
                      type="submit"
                      className="w-full"
                    >
                      {register.isPending && (
                        <LoaderCircle className="size-4" />
                      )}
                      Sign up
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/" className="underline underline-offset-4">
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="text-muted-foreground [&_a]:hover:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
