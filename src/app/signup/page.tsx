
"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name: email.split("@")[0],
        callbackURL: "/",
      });

      if (error) {
        setMessage(error.message || "Signup failed. Please try again.");
        return;
      }

      if (data) {
        setMessage("Signup successful! Redirecting...");

        router.replace("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Signup error:", err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 w-80 rounded-box border p-4">
          <legend className="fieldset-legend">Create Account</legend>

          <label className="label" htmlFor="email">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            className="input w-full"
            placeholder="Email"
            autoComplete="email"
            required
          />

          <label className="label" htmlFor="password">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            className="input w-full"
            placeholder="Password"
            autoComplete="new-password"
            minLength={8}
            required
          />

          {message && (
            <p role="status" className="mt-2 text-sm">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-neutral mt-4"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
