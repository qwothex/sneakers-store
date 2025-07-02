// context/UserContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types/user';

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean,
  setLoading: (v: boolean) => void
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
