type ProfileEmailProps = {
  email: string;
};

export default function ProfileEmail({ email }: ProfileEmailProps) {
  return <p className="profile__email">{email}</p>;
}
