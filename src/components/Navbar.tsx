"use client";
import React, { useState } from 'react';
import ColorModeToggle from '@/components/colormode';
import Link from 'next/link';
import { useDisclosure, Box, IconButton, Flex, Collapse, Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'; // Named import
import SignInModal from '@/components/SigninModal'; // Assuming you have a SignInModal component

const Navbar: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Add a state to track if user is logged in
  const { isOpen: isSignInOpen, onOpen: openSignIn, onClose: closeSignIn } = useDisclosure(); // Modal state for Sign-in

  // Function to handle protected routes
  const handleProtectedRoute = (e: React.MouseEvent, path: string) => {
    if (!isUserLoggedIn) {
      e.preventDefault();
      openSignIn(); // Open sign-in modal if the user is not logged in
    } else {
      if (typeof window !== 'undefined') {
        // Only run this in the browser, not during SSR
        window.location.href = path;
      }
    }
  };
  

  return (
    <div className="relative">
      {/* desktop navigation */}
      <nav className='flex justify-between p-5'>
        <div className='font-bold text-3xl text-amber-500'>
          INKLINK
        </div>
        
        <div className='hidden md:block text-lg'>
  <Flex align="center">
    {/* Color Mode Toggle */}
    <ColorModeToggle />

    {/* Links */}
    <Link href='/main' className='px-5 hover:text-amber-300'>
      Our Story
    </Link>
    <Link href='/main/contact-us' className='pr-5 hover:text-amber-300'>
      Contact us
    </Link>

    {/* Write Link - Protected */}
    <Link
      href="/main/get-started"
      className='pr-5 hover:text-amber-300'
      onClick={(e) => handleProtectedRoute(e, '/main/get-started')}
    >
      Write
    </Link>

    {/* Get Started Button */}
    <button>
      <Link
        href="/main/get-started"
        className='bg-amber-500 p-2 rounded-lg hover:bg-amber-400'
        onClick={(e) => handleProtectedRoute(e, '/get-started')}
      >
        Get Started
      </Link>
    </button>
  </Flex>
</div>

        <Box display={{ base: "block", md: "none" }}>
  {/* Flex container for ColorModeToggle and Hamburger IconButton */}
  <Flex
    justify="flex-end"  // Align to the right side
    align="center"
    position="fixed"
    top="1.5rem"
    right="1rem"
    zIndex="dropdown"
    gap={4}  // Add some space between the toggle and button
  >
    {/* Color Mode Toggle */}
    <ColorModeToggle />

    {/* Hamburger Menu IconButton */}
    <IconButton
      onClick={onToggle}
      icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
      aria-label="Toggle Navigation"
    />
  </Flex>

  {/* Menu Collapse Section */}
  <Collapse in={isOpen} animateOpacity>
    <Box
      position="fixed"
      top="0"
      right="0"
      width="250px"  // Adjust width as needed
      height="100vh"
      p={4}
      zIndex="overlay"
      bg="white"
    >
      <Flex direction="column" align="flex-end" h="100%">
        {/* Close button at the top right */}
        <Box mb={8}>
          <IconButton
            onClick={onToggle}
            icon={<CloseIcon />}
            aria-label="Close Navigation"
            variant="outline"
          />
        </Box>
        <Flex as="ul" listStyleType="none" flexDirection="column" alignItems="flex-end">
          <Box as="li" m={3}>
            <Link href='/main/' className='hover:text-amber-300' onClick={onToggle}>Our Story</Link>
          </Box>
          <Box as="li" m={3}>
            <Link href='/main/contact-us' className='hover:text-amber-300' onClick={onToggle}>Contact us</Link>
          </Box>
          <Box as="li" m={3}>
            <Link
              href="/get-started"
              className='hover:text-amber-300'
              onClick={(e) => handleProtectedRoute(e, '/get-started')}
            >
              Write
            </Link>
          </Box>
          <Box as="li" m={3}>
            <Link
              href="/get-started"
              className='px-2 mt-5 hover:text-amber-400 bg-amber-500 rounded-lg'
              onClick={(e) => handleProtectedRoute(e, '/get-started')}
            >
              Get Started
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Box>
  </Collapse>
</Box>


      </nav>
      <hr className="border-2px border-amber-500 mt-2 w-full"/>

      {/* Sign-In Modal */}
      <SignInModal isOpen={isSignInOpen} onClose={closeSignIn} />
    </div>
  );
};

export default Navbar;
