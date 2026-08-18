type ScaleFieldProps = {
  legend: string;
  value: number;
  onChange: (value: number) => void;
};

export default function ScaleField({ legend, value, onChange }: ScaleFieldProps) {
  return (
    <fieldset className="new-log__field">
      <legend>{legend}</legend>
      <div className="new-log__scale">
        {[1, 2, 3, 4, 5].map((scaleValue) => (
          <button
            key={scaleValue}
            type="button"
            className={`new-log__scale-btn ${value === scaleValue ? "new-log__scale-btn--active" : ""}`}
            onClick={() => onChange(scaleValue)}
          >
            {scaleValue}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
