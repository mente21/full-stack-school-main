"use client";
// Antigravity: Connected and verified! I fixed middleware.ts for you.

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const role = user?.publicMetadata?.role;

    // This log should now show 'admin' (or whatever you set)
    console.log('Clerk User Public Metadata Role:', role);

    if (typeof role === 'string' && role.trim() !== '') {
      const redirectPath = `/${role.toLowerCase()}`;
      console.log(`Role found: ${role}. Redirecting to: ${redirectPath}`);
      router.push(redirectPath);
      return;
    }

    // If role is NOT found (like 'undefined'), redirect to a safe default path
    console.log("No valid role found. Redirecting to default dashboard.");
    router.push('/dashboard'); // Change this to whatever default path you want

  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-lamaSkyLight via-white to-lamaPurpleLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl flex flex-col gap-4 min-w-[360px] border border-white/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-lamaSky to-lamaPurple rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🎓</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-lamaSky to-lamaPurple bg-clip-text text-transparent">
              Mente&apos;s School
            </h1>
          </div>
          <h2 className="text-gray-500 text-sm">Sign in to your account</h2>
          <Clerk.GlobalError className="text-sm text-red-500 bg-red-50 p-2 rounded-lg" />
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-3 rounded-xl ring-1 ring-gray-200 bg-white/80 focus:ring-2 focus:ring-lamaSky outline-none transition-all hover:ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-500" />
          </Clerk.Field>
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-3 rounded-xl ring-1 ring-gray-200 bg-white/80 focus:ring-2 focus:ring-lamaSky outline-none transition-all hover:ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-500" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="bg-gradient-to-r from-lamaSky to-lamaPurple text-white mt-2 rounded-xl text-sm p-3 font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;
