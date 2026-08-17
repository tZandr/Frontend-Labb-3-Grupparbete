import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteLog, fetchLog, fetchLogs, saveTodaysLog, updateLog, LOG_CATEGORIES } from "../api/logs";
import type { LogCategory } from "../api/logs";
import "./NewLog.scss";

function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

export default function NewLog() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [energy, setEnergy] = useState(3);
  const [mood, setMood] = useState(3);
  const [sleep, setSleep] = useState(3);
  const [note, setNote] = useState("");
  const [focusAreas, setFocusAreas] = useState<LogCategory[]>([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [hasTodaysLog, setHasTodaysLog] = useState(false);

  useEffect(() => {
    if (isEditMode) return;
    let cancelled = false;

    fetchLogs()
      .then((logs) => {
        if (!cancelled && logs.some((log) => isToday(log.created_at))) {
          setHasTodaysLog(true);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [isEditMode]);

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
        setFocusAreas(log.focusAreas);
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

  function toggleFocusArea(cat: LogCategory) {
    setFocusAreas((current) =>
      current.includes(cat) ? current.filter((entry) => entry !== cat) : [...current, cat],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatusMessage("");

    if (focusAreas.length === 0) {
      setError("Pick at least one focus area.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      energyLevel: energy,
      moodLevel: mood,
      sleepLevel: sleep,
      note: note.trim(),
      focusAreas,
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

      {!isEditMode && hasTodaysLog && (
        <p className="new-log__warning" role="alert">
          You've already logged today — saving will overwrite today's entry.
        </p>
      )}

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

        {/* Today's focus */}
        <fieldset className="new-log__field">
          <legend>Today's focus</legend>
          <div className="new-log__focus-group">
            {LOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={focusAreas.includes(cat)}
                className={`new-log__focus-btn ${focusAreas.includes(cat) ? "new-log__focus-btn--active" : ""}`}
                onClick={() => toggleFocusArea(cat)}
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
