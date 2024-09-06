"use client";
import React, { useState } from "react";
import SignInModal from "./SigninModal";
import SignUpModal from "./SignupModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@chakra-ui/react";

export default function Top() {
  // State management for SignInModal
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  const getInitials = (name: string) => {
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase();
  };

  // Handlers for opening and closing modals
  const openSignInModal = () => setIsSignInOpen(true);
  const closeSignInModal = () => setIsSignInOpen(false);

  const openSignUpModal = () => setIsSignUpOpen(true);
  const closeSignUpModal = () => setIsSignUpOpen(false);

  return (
    <div>
      <nav className="flex justify-between p-5">
        <div className="font-bold text-3xl text-amber-500">INKLINK</div>
        <div>
          {user ? (
            <>
              <Avatar
                size="md"
                name={user.displayName || "User"}
                src={user.photoURL || ""}
              >
                {!user.photoURL && getInitials(user.displayName || "User")}
              </Avatar>
              <button onClick={handleSignOut} className="p-2 border-2 rounded-md hover:bg-amber-500 mr-2 ml-4">Logout</button>
            </>
          ) : (
            <>
              <button
                onClick={openSignInModal}
                className="p-2 border-2 rounded-md hover:bg-amber-500 mr-2"
              >
                Sign In
              </button>
              <SignInModal isOpen={isSignInOpen} onClose={closeSignInModal} />

              <button
                onClick={openSignUpModal}
                className="p-2 border-2 rounded-md hover:bg-amber-500"
              >
                Sign Up
              </button>
              <SignUpModal isOpen={isSignUpOpen} onClose={closeSignUpModal} />
            </>
          )}
        </div>
      </nav>
      <hr className="border-2px border-amber-500 mt-2 w-full" />
    </div>
  );
}
