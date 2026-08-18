import type { ChangeEvent } from "react";

type ProfilePhotoUploadProps = {
  photoUrl: string | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function ProfilePhotoUpload({ photoUrl, onChange }: ProfilePhotoUploadProps) {
  return (
    <>
      <input
        id="profile-photo"
        className="profile__file-input"
        type="file"
        accept="image/*"
        onChange={onChange}
      />
      <label htmlFor="profile-photo" className="profile__photo-btn">
        {photoUrl ? "Change photo" : "Upload photo"}
      </label>
    </>
  );
}
