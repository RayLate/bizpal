import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from 'react';

export interface GoogleUser {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

interface GoogleUserContextValue {
  user: GoogleUser | null;
  setUser: React.Dispatch<React.SetStateAction<GoogleUser | null>>;
}

const GoogleUserContext = createContext<GoogleUserContextValue>({
  user: null,
  setUser: () => {},
});

export const useGoogleUser = () => useContext(GoogleUserContext);

export const GoogleUserProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<GoogleUser | null>(null);

  return (
    <GoogleUserContext.Provider value={{ user, setUser }}>
      {children}
    </GoogleUserContext.Provider>
  );
};
