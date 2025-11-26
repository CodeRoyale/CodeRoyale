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
          <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-4">
              <p className="text-sm text-gray-400">Realtime</p>
              <p className="mt-1 text-base font-semibold">Live Arenas</p>
            </div>
            <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-4">
              <p className="text-sm text-gray-400">Teams</p>
              <p className="mt-1 text-base font-semibold">Rooms & Veto</p>
            </div>
            <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-4">
              <p className="text-sm text-gray-400">Problems</p>
              <p className="mt-1 text-base font-semibold">Curated Sets</p>
            </div>
            <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-4">
              <p className="text-sm text-gray-400">Execution</p>
              <p className="mt-1 text-base font-semibold">Secure Sandboxing</p>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <a
              href="/dashboard"
              className="inline-flex items-center rounded-md bg-primary-100/80 hover:bg-primary-100 px-4 py-2 text-sm font-semibold text-black transition"
            >
              Explore Dashboard
            </a>
          </div>
        </div>
        <div className="col-span-1 my-auto p-8">
          <h1 className="mb-3 text-2xl font-bold text-primary-100 text-center">
            Welcome
          </h1>
          {!showAuthForm ? null : (
            <AuthFormController authOptions={authOptions} />
          )}
          {showAuthForm ? null : (
            <div className="flex justify-center pr-4">
              <GoogleOAuthProvider clientId={googleClientId}>
                <GoogleAuthButtonController
                  getGoogleUser={(googleUser) => {
                    setAuthOptions(googleUser);
                    setShowAuthForm(true);
                  }}
                />
              </GoogleOAuthProvider>
            </div>
          )}
          {/* <div className="mt-6">
            <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-4">
              <p className="text-sm text-gray-400 text-center">
                Trusted by competitive programmers • Zero-config setup •
                Session-based auth
              </p>
            </div>
          </div> */}
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
          {/* <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-300">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <a href="/dashboard" className="hover:text-white">
              Dashboard
            </a>
            <a href="/profile/me" className="hover:text-white">
              Profile
            </a>
          </nav> */}
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
