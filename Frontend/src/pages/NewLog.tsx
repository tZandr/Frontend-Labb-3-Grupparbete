import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteLog, fetchLog, fetchLogs, saveTodaysLog, updateLog, LOG_CATEGORIES } from "../api/logs";
import type { LogCategory } from "../api/logs";
import NewLogHeader from "../components/new-log/NewLogHeader";
import ScaleField from "../components/new-log/ScaleField";
import NoteField from "../components/new-log/NoteField";
import SaveLogButton from "../components/new-log/SaveLogButton";
import { useToast } from "../context/ToastContext";

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
  const { showToast } = useToast();

  const [energy, setEnergy] = useState(3);
  const [mood, setMood] = useState(3);
  const [sleep, setSleep] = useState(3);
  const [note, setNote] = useState("");
  const [focusAreas, setFocusAreas] = useState<LogCategory[]>([]);
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
        showToast("Log updated!");
        navigate("/dashboard");
      } else {
        const result = await saveTodaysLog(payload);
        showToast(result.message);
        navigate("/dashboard");
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
      <div className="new-log-page">
        <section className="new-log">
          <p>Loading…</p>
        </section>
      </div>
    );
  }

  return (
    <div className="new-log-page">
      <section className="new-log">
        <NewLogHeader title={isEditMode ? "Edit your log" : "Log how you feel today"} />

      {!isEditMode && hasTodaysLog && (
        <p className="new-log__warning" role="alert">
          You've already logged today — saving will overwrite today's entry.
        </p>
      )}

      <form className="new-log__form" onSubmit={handleSubmit}>
        <ScaleField legend="Energy" value={energy} onChange={setEnergy} />
        <ScaleField legend="Mood" value={mood} onChange={setMood} />
        <ScaleField legend="Sleep" value={sleep} onChange={setSleep} />

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

        <NoteField value={note} onChange={setNote} />

        {error && (
          <p className="new-log__error" role="alert">
            {error}
          </p>
        )}

        <div className="new-log__actions">
          <SaveLogButton disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : isEditMode ? "Save changes" : "Save log"}
          </SaveLogButton>

          {isEditMode && (
            <button type="button" className="new-log__delete" onClick={handleDelete} disabled={isSubmitting}>
              Delete log
            </button>
          )}
        </div>
      </form>
      </section>
    </div>
  );
}
