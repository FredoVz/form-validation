import { useMutation } from "@tanstack/react-query";
import { type SubmitHandler } from "react-hook-form";
import type { Dispatch, SetStateAction } from "react";
import * as z from "zod";
import Form from "./Form";

const loginSchema = z.object({
  username: z.string("Username is required").regex(/^[a-z0-9]+$/, "Username must be alphanumeric with smallcase"),
  password: z.string("Password is required").min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const loginFields = [
  { name: "username", label: "Username", type: "text", placeholder: "Insert Your Username" },
  { name: "password", label: "Password", type: "password", placeholder: "Insert Your Password" },
];

const loginDefaultValues = { username: "", password: "" };

const Login = ({ setSession }: { setSession: Dispatch<SetStateAction<string | null>> }) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginForm) => {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
      return res;
    },
    onSuccess: (data) => {
      setSession(data.token);
    },
    onError: () => {
      alert("Username or Password doesn't match");
    },
  });

  const onLogin: SubmitHandler<LoginForm> = (data) => {
    //e.currentTarget.value;
    mutate(data);
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen min-h-screen gap-4">
      <div className="p-8 border border-gray-200 rounded-xl">
        <div className="flex flex-col items-center justify-center mb-4">
          <h2 className="text-2xl font-bold text-center text-teal-600">Sign In To Your Account</h2>
          <p className="text-2xl font-bold text-center text-teal-600">(With Register)</p>
        </div>
        <div className="max-w-sm w-sm">
          <Form schema={loginSchema} onSubmit={onLogin} fields={loginFields} isLoading={isPending} defaultValues={loginDefaultValues} />
        </div>
      </div>
    </main>
  );
};

export default Login;
