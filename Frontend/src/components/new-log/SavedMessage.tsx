type SavedMessageProps = {
  message: string;
};

export default function SavedMessage({ message }: SavedMessageProps) {
  if (!message) return null;

  return (
    <p className="new-log__success" role="status">
      {message}
    </p>
  );
}
