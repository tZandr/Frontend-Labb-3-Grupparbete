import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { getStoredUser, USER_STORAGE_KEY } from "../auth";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import ProfilePhotoUpload from "../components/profile/ProfilePhotoUpload";
import ProfileEmail from "../components/profile/ProfileEmail";
import ProfileDisplayName from "../components/profile/ProfileDisplayName";
import ProfileEditNameForm from "../components/profile/ProfileEditNameForm";
import "./Profile.scss"

export default function Profile() {
  const storedUser = getStoredUser();

  const [name, setName] = useState(storedUser?.name ?? "User");
  const [isEditingName, setIsEditingName] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const initials =
    name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

    function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
      const file = event.target.files?.[0];
      if (!file) return;

      const previewUrl = URL.createObjectURL(file);
      setPhotoUrl(previewUrl);
    }

    function handleNameSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const trimmed = name.trim();
      if (!trimmed) return;

      setName(trimmed);
      setIsEditingName(false);

      if (storedUser) {
        const updatedUser = { ...storedUser, name: trimmed };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      }
    }

    return (
      <div className="profile-page">
        <section className="profile">
         <ProfileHeader />

         <div className="profile__avatar-wrap">
          <ProfileAvatar photoUrl={photoUrl} initials={initials} />
          <ProfilePhotoUpload photoUrl={photoUrl} onChange={handlePhotoChange} />
         </div>

         <ProfileEmail email={storedUser?.email ?? "No email"} />

         {!isEditingName ? (
          <ProfileDisplayName name={name} onEdit={() => setIsEditingName(true)} />
         ) : (
          <ProfileEditNameForm
            name={name}
            onNameChange={setName}
            onSubmit={handleNameSubmit}
            onCancel={() => {
              setName(storedUser?.name ?? name);
              setIsEditingName(false);
            }}
          />
         )}
        </section>
      </div>
    )
}
