type NoteFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function NoteField({ value, onChange }: NoteFieldProps) {
  return (
    <label className="new-log__field" htmlFor="note">
      Note (optional)
      <textarea
        id="note"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ex. I had a great day"
        rows={4}
      />
    </label>
  );
}
