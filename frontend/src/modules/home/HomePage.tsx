import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/router";
import { googleClientId } from "../../utils/constants";
import { useMeQuery } from "../../generated/graphql";
import { AuthFormController } from "./AuthFormController";
import {
  GoogleAuthButtonController,
  GoogleUser,
} from "./GoogleAuthButtonController";

export const HomePage = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery();

  const [showAuthForm, setShowAuthForm] = useState<boolean>(false);

  const [authOptions, setAuthOptions] = useState<GoogleUser>();

  let body = null;

  if (loading) {
  } else if (!data?.me) {
    body = (
      <>
        <div className="col-span-1 text-white flex flex-col items-center justify-center px-8">
          <img
            src="/img/CodeRoyaleLogo.png"
            alt="CodeRoyale"
            className="w-40 h-40 object-contain mb-6"
          />
          <h1 className="text-4xl font-extrabold tracking-tight">CodeRoyale</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-md text-center">
            Battle-tested coding arenas, real-time rooms, and collaborative
            play. Join, compete, and level up your skills.
          </p>
        </div>
        <div className="col-span-1 my-auto p-8">
          <h1 className="mb-3 text-2xl font-bold text-primary-100 text-center">
            Welcome
          </h1>
          {!showAuthForm ? null : (
            <AuthFormController authOptions={authOptions} />
          )}
          {showAuthForm ? null : (
            <GoogleOAuthProvider clientId={googleClientId}>
              <GoogleAuthButtonController
                getGoogleUser={(googleUser) => {
                  setAuthOptions(googleUser);
                  setShowAuthForm(true);
                }}
              />
            </GoogleOAuthProvider>
          )}
        </div>
      </>
    );
  } else {
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wide">CodeRoyale</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-300">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <a href="/dashboard" className="hover:text-white">
              Dashboard
            </a>
            <a href="/profile/me" className="hover:text-white">
              Profile
            </a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div
          className="grid gap-5 justify-center"
          style={{ gridTemplateColumns: "640px 640px", margin: "0 auto" }}
        >
          {body}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} CodeRoyale • Built for competitive coding
        </div>
      </footer>
    </div>
  );
};
