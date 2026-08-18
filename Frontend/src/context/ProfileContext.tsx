import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { fetchMyProfile, updateMyProfile, resolveAvatarUrl } from "../api/profile";

type ProfileContextValue = {
  name: string;
  email: string;
  photoUrl: string | null;
  isLoading: boolean;
  error: string;
  updateName: (newName: string) => Promise<boolean>;
  updatePhoto: (file: File) => Promise<void>;
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetchMyProfile()
      .then((user) => {
        if (cancelled) return;
        setName(user.name);
        setEmail(user.email);
        setPhotoUrl(resolveAvatarUrl(user.avatar_url));
      })
      .catch((caughtError) => {
        if (!cancelled) {
          setError(caughtError instanceof Error ? caughtError.message : "Unable to load your profile.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const updateName = useCallback(async (newName: string): Promise<boolean> => {
    setError("");
    try {
      const user = await updateMyProfile({ name: newName });
      setName(user.name);
      return true;
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to update your name.");
      return false;
    }
  }, []);

  const updatePhoto = useCallback(async (file: File) => {
    setError("");
    const previewUrl = URL.createObjectURL(file);
    setPhotoUrl(previewUrl);

    try {
      const user = await updateMyProfile({ photo: file });
      setPhotoUrl(resolveAvatarUrl(user.avatar_url));
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to update your photo.");
    }
  }, []);

  return (
    <ProfileContext.Provider value={{ name, email, photoUrl, isLoading, error, updateName, updatePhoto }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileProvider");
  return context;
}
