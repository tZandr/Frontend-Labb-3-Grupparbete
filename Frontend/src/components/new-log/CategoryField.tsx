type CategoryFieldProps<T extends string> = {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

export default function CategoryField<T extends string>({
  options,
  value,
  onChange,
}: CategoryFieldProps<T>) {
  return (
    <fieldset className="new-log__field">
      <legend>Category</legend>
      <div className="new-log__category-group">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`new-log__category-btn ${value === option ? "new-log__category-btn--active" : ""}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
