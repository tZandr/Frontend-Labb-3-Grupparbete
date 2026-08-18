type ProfileAvatarProps = {
  photoUrl: string | null;
  initials: string;
};

export default function ProfileAvatar({ photoUrl, initials }: ProfileAvatarProps) {
  if (photoUrl) {
    return (
      <img
        className="profile__avatar"
        src={photoUrl}
        alt="Your profile picture"
      />
    );
  }

  return (
    <div className="profile__avatar profile__avatar--placeholder" aria-hidden="true">
      {initials}
    </div>
  );
}
