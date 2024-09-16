"use client";
import React, { useState } from "react";
import SignInModal from "@/components/SigninModal";
import SignUpModal from "@/components/SignupModal";

export default function AuthModals() {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  
    const openSignInModal = () => setIsSignInOpen(true);
    const closeSignInModal = () => setIsSignInOpen(false);
    const openSignUpModal = () => {
      setIsSignInOpen(false); // Close sign-in modal when opening sign-up
      setIsSignUpOpen(true);
    };
    const closeSignUpModal = () => setIsSignUpOpen(false);
  
    return (
      <>
        <SignInModal
          isOpen={isSignInOpen}
          onClose={closeSignInModal}
          openSignUp={openSignUpModal} // Pass the function to open the sign-up modal
        />
        <SignUpModal
          isOpen={isSignUpOpen}
          onClose={closeSignUpModal}
        />
        <button onClick={openSignInModal}>Open Sign In Modal</button>
      </>
    );
  }
  

