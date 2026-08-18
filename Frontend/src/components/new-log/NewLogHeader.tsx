type NewLogHeaderProps = {
  title: string;
};

export default function NewLogHeader({ title }: NewLogHeaderProps) {
  return (
    <>
      <h1 className="new-log__title">{title}</h1>
      <p className="new-log__intro">
        Fill in how you are feeling
      </p>
    </>
  );
}
