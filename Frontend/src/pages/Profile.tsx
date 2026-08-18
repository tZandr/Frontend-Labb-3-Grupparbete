import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useProfile } from "../context/ProfileContext";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import ProfilePhotoUpload from "../components/profile/ProfilePhotoUpload";
import ProfileEmail from "../components/profile/ProfileEmail";
import ProfileDisplayName from "../components/profile/ProfileDisplayName";
import ProfileEditNameForm from "../components/profile/ProfileEditNameForm";
import "./Profile.scss"

export default function Profile() {
  const { name, email, photoUrl, isLoading, error, updateName, updatePhoto } = useProfile();

  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState("");

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
      updatePhoto(file);
    }

    async function handleNameSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const trimmed = draftName.trim();
      if (!trimmed) return;

      const success = await updateName(trimmed);
      if (success) setIsEditingName(false);
    }

    if (isLoading) {
      return (
        <div className="profile-page">
          <p>Loading…</p>
        </div>
      );
    }

    return (
      <div className="profile-page">
        <section className="profile">
         <ProfileHeader />

         <div className="profile__avatar-wrap">
          <ProfileAvatar photoUrl={photoUrl} initials={initials} />
          <ProfilePhotoUpload photoUrl={photoUrl} onChange={handlePhotoChange} />
         </div>

         <ProfileEmail email={email || "No email"} />

         {error && (
           <p className="profile__error" role="alert">
             {error}
           </p>
         )}

         {!isEditingName ? (
          <ProfileDisplayName name={name} onEdit={() => { setDraftName(name); setIsEditingName(true); }} />
         ) : (
          <ProfileEditNameForm
            name={draftName}
            onNameChange={setDraftName}
            onSubmit={handleNameSubmit}
            onCancel={() => setIsEditingName(false)}
          />
         )}
        </section>
      </div>
    )
}
