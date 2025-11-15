"use client";
import { useAuthStore } from "@/store/store";

export default function Dashboard() {
  const { userEmail, token } = useAuthStore();

  if (!token)
    return (
      <>
        <h1>login first</h1>
      </>
    );
  return (
    <div>
      <h1>Welcome, {userEmail}</h1>
      <p>Your token: {token}</p>
    </div>
  );
}
