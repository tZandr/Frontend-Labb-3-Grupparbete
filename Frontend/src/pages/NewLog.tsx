import { useState } from "react";
import type { FormEvent } from "react";
import NewLogHeader from "../components/new-log/NewLogHeader";
import ScaleField from "../components/new-log/ScaleField";
import CategoryField from "../components/new-log/CategoryField";
import NoteField from "../components/new-log/NoteField";
import SaveLogButton from "../components/new-log/SaveLogButton";
import SavedMessage from "../components/new-log/SavedMessage";
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
      <NewLogHeader />

      <form className="new-log__form" onSubmit={handleSubmit}>
        <ScaleField legend="Energy" value={energy} onChange={setEnergy} />
        <ScaleField legend="Mood" value={mood} onChange={setMood} />
        <ScaleField legend="Sleep" value={sleep} onChange={setSleep} />
        <CategoryField
          options={CATEGORIES}
          value={category}
          onChange={setCategory}
        />
        <NoteField value={note} onChange={setNote} />
        <SaveLogButton />
        <SavedMessage message={savedMessage} />
      </form>
    </section>
  )
}
