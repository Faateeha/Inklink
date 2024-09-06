"use client";
import React from 'react';
import Link from 'next/link';
import { useDisclosure, Box, IconButton, Flex, Collapse } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'; // Named import

const Navbar: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <div className="relative ">
      {/* desktop navigation */}
      <nav className='flex justify-between p-5'>
        <div className='font-bold text-3xl text-amber-500'>
          INKLINK
        </div>
        <div className='hidden md:block text-lg'>
          <Link href='/main/our-story' className='pr-5 hover:text-amber-300'>Our Story</Link>
          <Link href='/main/contact-us' className='pr-5 hover:text-amber-300'>Contact us</Link>
          <Link href='/get-started' className='pr-5 hover:text-amber-300'>Write</Link>
          <button>
            <Link href='/get-started' className='bg-amber-500 p-2 rounded-lg hover:bg-amber-400'>Get Started</Link>
          </button>
        </div>
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Toggle Navigation"
            mb={4}
            position="fixed"
            top="1rem"
            right="1rem"
            zIndex="dropdown" // Ensure it’s above the menu items
          />
          <Collapse in={isOpen} animateOpacity>
            <Box
              position="fixed"
              top="0"
              right="0"
              width="250px" // Adjust the width as needed
              height="100vh"
               // Background color
              
              p={4}
              zIndex="overlay" // Ensure it’s below the close icon
            >
              <Flex direction="column" align="flex-end" h="100%">
                {/* Close button at the top right */}
                <Box mb={8}> {/* Margin bottom to separate from links */}
                  <IconButton
                    onClick={onToggle}
                    icon={<CloseIcon />}
                    aria-label="Close Navigation"
                    variant="outline"
                    
                  />
                </Box>
                <Flex as="ul" listStyleType="none" flexDirection="column" alignItems="flex-end">
                  <Box as="li" m={3}>
                    <Link href='/main/our-story' className='hover:text-amber-300' onClick={onToggle}>Our Story</Link>
                  </Box>
                  <Box as="li" m={3}>
                    <Link href='/main/contact-us' className='hover:text-amber-300' onClick={onToggle}>Membership</Link>
                  </Box>
                  <Box as="li" m={3}>
                    <Link href='/get-started' className='hover:text-amber-300' onClick={onToggle}>Write</Link>
                  </Box>
                  <Box as="li" m={3}>
                    <Link href='/get-started' className='px-2 mt-5 hover:text-amber-400 bg-amber-500 rounded-lg' onClick={onToggle}>Get Started</Link>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Collapse>
        </Box>
      </nav>
      <hr className="border-2px border-amber-500 mt-2 w-full"/>
    </div>
  );
};

export default Navbar;