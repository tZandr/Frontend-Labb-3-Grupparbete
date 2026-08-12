import { useState } from "react";
import type { FormEvent } from "react";
import "./NewLog.scss";

const CATEGORIES = ["Mindfulness", "Movement", "Nutrition"] as const;
type Category = (typeof CATEGORIES)[number];

type LogFormData = {
  energy: number;
  mood: number;
  sleep: number;
  note: string;
  category: Category;
};

export default function NewLog() {
  const [energy, setEnergy] = useState(3);
  const [mood, setMood] = useState(3);
  const [sleep, setSleep] = useState(3);
  const [note, setNote] = useState("");
  const [category, setCategory] = useState<Category>("Mindfulness");
  const [savedMessage, setSavedMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const logData: LogFormData = {
      energy,
      mood,
      sleep,
      note: note.trim(),
      category,
    };

    console.log(logData);
    setSavedMessage("Log saved successfully!");
  }

  return (
    <section className="new-log">
      <h1 className="new-log__title">Log how you feel today</h1>
      <p className="new-log__intro">
        Fill in how you are feeling
      </p>

      {/*Energy*/}
      <form className="new-log__form" onSubmit={handleSubmit}>
        <fieldset className="new-log__field">
          <legend>Energy</legend>
          <div className="new-log__scale">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={`new-log__scale-btn ${energy === value ? "new-log__scale-btn--active" : ""}`}
                onClick={() => setEnergy(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </fieldset>

        {/*Mood*/}
        <fieldset className="new-log__field">
          <legend>Mood</legend>
          <div className="new-log__scale">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={`new-log__scale-btn ${mood === value ? "new-log__scale-btn--active" : ""}`}
                onClick={() => setMood(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </fieldset>

        {/*Sleep*/}
        <fieldset className="new-log__field">
          <legend>Sleep</legend>
          <div className="new-log__scale">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={`new-log__scale-btn ${sleep === value ? "new-log__scale-btn--active" : ""}`}
                onClick={() => setSleep(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Category */}
        <fieldset className="new-log__field">
          <legend>Category</legend>
          <div className="new-log__category-group">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`new-log__category-btn ${category === cat ? "new-log__category-btn--active" : ""
                  }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </fieldset>

        {/*Note*/}
        <label className="new-log__field" htmlFor="note">
          Note (optional)
          <textarea
            id="note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Ex. I had a great day"
            rows={4}
          />
        </label>

        <button type="submit" className="new-log__submit">
          Save log
        </button>

        {savedMessage && (
          <p className="new-log__success" role="status">
            {savedMessage}
          </p>
        )}
      </form>
    </section>
  )
}
