type ProfileDisplayNameProps = {
  name: string;
  onEdit: () => void;
};

export default function ProfileDisplayName({ name, onEdit }: ProfileDisplayNameProps) {
  return (
    <div className="profile__name-row">
      <p className="profile__name">{name}</p>
      <button
        type="button"
        className="profile__edit-btn"
        onClick={onEdit}
      >
        Edit name
      </button>
    </div>
  );
}
