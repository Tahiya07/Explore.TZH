"use client";

interface AudioToggleProps {
  enabled: boolean;
  onToggle: () => void;
  available?: boolean;
  className?: string;
}

export function AudioToggle({
  enabled,
  onToggle,
  available = true,
  className = "",
}: AudioToggleProps) {
  const stateLabel = available ? (enabled ? "SOUND ON" : "SOUND OFF") : "SOUND UNAVAILABLE";
  const actionLabel = available
    ? enabled
      ? "Turn ambient laboratory sound off"
      : "Turn ambient laboratory sound on"
    : "Ambient laboratory sound is unavailable in this browser";

  return (
    <button
      type="button"
      className={`audio-toggle ${className}`.trim()}
      aria-label={actionLabel}
      aria-pressed={enabled}
      disabled={!available}
      onClick={onToggle}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="audio-toggle__icon">
        <path d="M4.5 9.25v5.5h3.7l4.6 3.65V5.6L8.2 9.25H4.5Z" fill="currentColor" />
        {enabled ? (
          <path
            d="M16 8.35a5.25 5.25 0 0 1 0 7.3M18.75 5.8a8.9 8.9 0 0 1 0 12.4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        ) : (
          <path
            d="m16.2 9.05 4.3 4.3m0-4.3-4.3 4.3"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        )}
      </svg>
      <span>{stateLabel}</span>
    </button>
  );
}
