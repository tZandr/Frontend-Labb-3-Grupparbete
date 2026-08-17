import type { FormEvent } from "react";

type ProfileEditNameFormProps = {
  name: string;
  onNameChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export default function ProfileEditNameForm({
  name,
  onNameChange,
  onSubmit,
  onCancel,
}: ProfileEditNameFormProps) {
  return (
    <form className="profile__name-form" onSubmit={onSubmit}>
      <label className="profile__label" htmlFor="profile-name">
        Display name
        <input
          id="profile-name"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          required
        />
      </label>
      <div className="profile__name-actions">
        <button type="submit" className="profile__save-btn">
          Save
        </button>
        <button
          type="button"
          className="profile__cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
