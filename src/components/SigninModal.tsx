
"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/app/firebase";
import AuthModals from "@/app/authModals";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Text
} from "@chakra-ui/react";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  openSignUp: () => void; // Function to open the sign-up modal
}

export default function SignInModal({ isOpen, onClose, openSignUp }: SignInModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/main/profile");
      onClose(); // Close the modal only on successful sign-in
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/main/profile");
      onClose(); // Close the modal only on successful sign-in
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email to reset password');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setError('Password reset email sent!');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="lg" py={6} px={8}>
        <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold" color="amber.500">
          Sign In
        </ModalHeader>
        <ModalCloseButton color="amber.500" />
        <ModalBody>
          {error && <Text color="red.500" mb={4}>{error}</Text>}
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={4}
            size="lg"
            bg="gray.800"
            color="white"
            _placeholder={{ color: 'gray.400' }}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
            bg="gray.800"
            color="white"
            _placeholder={{ color: 'gray.400' }}
          />
        </ModalBody>
        <ModalFooter flexDirection="column" alignItems="center">
          <Button
            colorScheme="orange"
            size="lg"
            width="full"
            onClick={handleSignIn}
            mb={4}
          >
            Sign In
          </Button>

          <Button
            variant="link"
            color="amber.500"
            onClick={handleForgotPassword}
            mb={2}
          >
            Forgot Password?
          </Button>
          <Text mb={2}>or</Text>
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            width="full"
            size="lg"
            leftIcon={<FcGoogle />}
            borderColor="amber.500"
            color="amber.500"
            _hover={{ bg: "gray.800" }}
            mb={4}
          >
            Sign In with Google
          </Button>

          <Text color="amber.500" mb={4}>
            Don&apos;t have an account?{" "}
            <Button variant="link" color="amber.500" onClick={openSignUp}>
              Sign Up
            </Button>
          </Text>

          <Link href="/">
            <Text color="amber.500" _hover={{ textDecoration: "underline" }}>
              <b>Go back to home page</b>
            </Text>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

