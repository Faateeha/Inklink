import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase'; // Your Firebase configuration

export const useAuth = () => {
  const [user] = useAuthState(auth);

  if (user) {
    return {
      uid: user.uid, // Include UID since you need it for Firebase updates
      name: user.displayName || 'Anonymous', // Use a default if no display name is set
      avatar: user.photoURL || '/default-avatar.png', // Default avatar if none is set
    };
  }

  return null;
};

