import { createContext } from 'react';
import { AuthUser } from './type'

type AuthContextType = {
    user: AuthUser | null;
    setUser: (newUser: AuthUser | null) => void;
};

const AuthContext = createContext<AuthContextType>({
    setUser: () => undefined,
    user: null,
});

export default AuthContext;
