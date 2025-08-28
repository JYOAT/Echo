"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@workspace/ui/components/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);
  return (
    <>
      <Authenticated>
        <div className="flex items-center justify-center min-h-svh">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text- 2xl font-bold">Hello World Web</h1>
            <UserButton></UserButton>
            <Button onClick={() => addUser()}>Add</Button>
            <div>
              {users ? (
                users.map((user) => (
                  <div key={user._id}>
                    <span>{user.name}</span>
                  </div>
                ))
              ) : (
                <span>Loading...</span>
              )}
            </div>
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>must be signed in</p>
        <SignInButton>Sign In</SignInButton>
      </Unauthenticated>
    </>
  );
}
