'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Link from "next/link";
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
import { FcGoogle } from "react-icons/fc";



  
export default function SignUpModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    const user = userCredential.user;
    await updateProfile(user, {displayName: username});
    router.push('/main/profile');
    onClose();
    } catch (error: any){
      setError(error.message)
    }
    
  };
  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/main/profile");
      onClose()
    } catch (error: any) {
      setError(error.message);
    }
    
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="black" // Black background
        color="white" // White text color
        maxW="lg" // Larger width for the modal
        py={6} // Padding for vertical spacing
        px={8} // Padding for horizontal spacing
      >
        <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold" color="amber.500">
          Sign Up
        </ModalHeader>
        <ModalCloseButton color="amber.500" />
        <ModalBody>
          {error && <Text color="red.500" mb={4}>{error}</Text>}
          
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            mb={4}
            size="lg"
            bg="gray.800" // Darker input background
            color="white"
            _placeholder={{ color: 'gray.400' }} // Placeholder color
          />
          
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
            mb={4}
            size="lg"
            bg="gray.800"
            color="white"
            _placeholder={{ color: 'gray.400' }}
          />
          
          <Input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={handleSignUp}
            mb={4}
          >
            Sign Up
          </Button>
          
          <Text mb={2}>or</Text>
          
          <Button
            variant="outline"
            onClick={handleGoogleSignUp}
            width="full"
            size="lg"
            leftIcon={<FcGoogle />}
            borderColor="amber.500"
            color="amber.500"
            _hover={{ bg: "gray.800" }} // Hover effect
            mb={4}
          >
            Sign Up with Google
          </Button>
          
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