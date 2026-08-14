import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteLog, fetchLog, saveTodaysLog, updateLog, LOG_CATEGORIES } from "../api/logs";
import type { LogCategory } from "../api/logs";
import "./NewLog.scss";

export default function NewLog() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [energy, setEnergy] = useState(3);
  const [mood, setMood] = useState(3);
  const [sleep, setSleep] = useState(3);
  const [note, setNote] = useState("");
  const [category, setCategory] = useState<LogCategory>("Mindfulness");
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    fetchLog(id)
      .then((log) => {
        if (cancelled) return;
        setEnergy(log.energyLevel);
        setMood(log.moodLevel);
        setSleep(log.sleepLevel);
        setNote(log.note ?? "");
        setCategory(log.category);
      })
      .catch((caughtError) => {
        if (!cancelled) {
          setError(caughtError instanceof Error ? caughtError.message : "Unable to load this log.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatusMessage("");
    setIsSubmitting(true);

    const payload = {
      energyLevel: energy,
      moodLevel: mood,
      sleepLevel: sleep,
      note: note.trim(),
      category,
    };

    try {
      if (isEditMode && id) {
        await updateLog(id, payload);
        navigate("/dashboard");
      } else {
        const result = await saveTodaysLog(payload);
        setStatusMessage(result.message);
        setTimeout(() => navigate("/dashboard"), 1200);
      }
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to save your log. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!id) return;
    if (!window.confirm("Delete this log entry? This can't be undone.")) return;

    setIsSubmitting(true);
    setError("");
    try {
      await deleteLog(id);
      navigate("/dashboard");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to delete this log.");
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <section className="new-log">
        <p>Loading…</p>
      </section>
    );
  }

  return (
    <section className="new-log">
      <h1 className="new-log__title">{isEditMode ? "Edit your log" : "Log how you feel today"}</h1>
      <p className="new-log__intro">Fill in how you are feeling</p>

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
            {LOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`new-log__category-btn ${category === cat ? "new-log__category-btn--active" : ""}`}
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

        {error && (
          <p className="new-log__error" role="alert">
            {error}
          </p>
        )}

        {statusMessage && (
          <p className="new-log__success" role="status">
            {statusMessage}
          </p>
        )}

        <div className="new-log__actions">
          <button type="submit" className="new-log__submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : isEditMode ? "Save changes" : "Save log"}
          </button>

          {isEditMode && (
            <button type="button" className="new-log__delete" onClick={handleDelete} disabled={isSubmitting}>
              Delete log
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
