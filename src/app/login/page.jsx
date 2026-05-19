"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        
        const {data, error} = await authClient.signIn.email({
            email: user.email,
            password: user.password
        })
        console.log(data, error)

        if (data) {
          toast.success('Logged in successfully! Redirecting...');
          setTimeout(() => router.push('/'), 1200);
        }
        if (error) {
          toast.error(error.message || 'Login failed');
        }

    }

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <Card>
        <div>
          <h2 className="text-2xl font-bold mb-4 justify-center flex">
            Log In to Your Account
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            {" "}
            Join SportsNest and start booking your favorite sports facilities
            today!
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex w-96 flex-col gap-4">
            <TextField isRequired name="email" type="email">
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[a-z]/.test(value)) {
                  return "Password must contain at least one lowercase letter";
                }
                return null;
              }}
            >
              <Label>Password</Label>
              <Input placeholder="Enter your password" />
              <Description>
                Must be at least 8 characters with 1 uppercase and 1 lowercase.
              </Description>
              <FieldError />
            </TextField>
            <div className="gap-2">
              <Button type="submit" className="flex items-center gap-2 w-full">
                Log In
              </Button>
              <Button className="flex items-center gap-2 w-full mt-3">
                Sign In with Google
              </Button>
            </div>
          </form>
        </div>
      </Card>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default LoginPage;
