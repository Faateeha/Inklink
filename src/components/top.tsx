'use client';
import { useState } from 'react';
import SignInModal from './SigninModal';
import SignUpModal from './SignupModal';

export default function Top() {
  // State management for SignInModal
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

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
        </div>
      </nav>
      <hr className="border-2px border-amber-500 mt-2 w-full" />
    </div>
  );
}
