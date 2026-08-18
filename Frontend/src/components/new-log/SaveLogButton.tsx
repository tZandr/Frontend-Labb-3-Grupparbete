type SaveLogButtonProps = {
  disabled?: boolean;
  children: string;
};

export default function SaveLogButton({ disabled, children }: SaveLogButtonProps) {
  return (
    <button type="submit" className="new-log__submit" disabled={disabled}>
      {children}
    </button>
  );
}
