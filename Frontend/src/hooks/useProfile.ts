import { useEffect, useState } from "react";
import { fetchMyProfile, updateMyProfile, resolveAvatarUrl } from "../api/profile";

export function useProfile() {
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

  async function updateName(newName: string): Promise<boolean> {
    setError("");
    try {
      const user = await updateMyProfile({ name: newName });
      setName(user.name);
      return true;
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to update your name.");
      return false;
    }
  }

  async function updatePhoto(file: File) {
    setError("");
    const previewUrl = URL.createObjectURL(file);
    setPhotoUrl(previewUrl);

    try {
      const user = await updateMyProfile({ photo: file });
      setPhotoUrl(resolveAvatarUrl(user.avatar_url));
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to update your photo.");
    }
  }

  return { name, email, photoUrl, isLoading, error, updateName, updatePhoto };
}
