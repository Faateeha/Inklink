import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase'; // Your Firebase configuration

export const useAuth = () => {
  const [user] = useAuthState(auth);
  if (user) {
    return {
      name: user.displayName || 'Anonymous', // Use a default if no display name is set
      avatar: user.photoURL || '/default-avatar.png', // Default avatar if none is set
    };
  }
  return null;
};
