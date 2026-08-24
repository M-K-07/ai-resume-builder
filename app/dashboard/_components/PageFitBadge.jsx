"use client";
import { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { CHAR_THRESHOLDS } from "../../../lib/resumeCharCount";

/**
 * PageFitBadge
 * Displays a live animated progress bar showing how full the resume is.
 * Placed above the resume preview on the right panel.
 *
 * States:
 *  too-short   → yellow  — "Add more detail"
 *  ideal       → green   — "Fits 1 page ✅"
 *  almost-full → green   — "Almost perfect"
 *  overflow    → red     — "Too long — trim content"
 */
const STATUS_CONFIG = {
  "too-short": {
    label: "Resume looks sparse — add more detail",
    barColor: "bg-amber-400",
    textColor: "text-amber-400",
    bgColor: "bg-amber-400/10 border-amber-400/20",
    emoji: "📝",
  },
  ideal: {
    label: "Fits 1 page perfectly",
    barColor: "bg-emerald-400",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-400/10 border-emerald-400/20",
    emoji: "✅",
  },
  "almost-full": {
    label: "Almost perfect — minor trim may help",
    barColor: "bg-emerald-400",
    textColor: "text-emerald-300",
    bgColor: "bg-emerald-400/10 border-emerald-400/20",
    emoji: "🎯",
  },
  overflow: {
    label: "Too long — trim descriptions to fit 1 page",
    barColor: "bg-red-500",
    textColor: "text-red-400",
    bgColor: "bg-red-500/10 border-red-500/20",
    emoji: "⚠️",
  },
};

export default function PageFitBadge() {
  const { charCount } = useContext(ResumeContext);

  if (!charCount) return null;

  const { contentChars, status } = charCount;
  const config = STATUS_CONFIG[status] || STATUS_CONFIG["too-short"];

  // Progress bar: capped at 100%, overflows show full red bar
  const progressPct = Math.min(
    100,
    Math.round((contentChars / CHAR_THRESHOLDS.IDEAL_MAX) * 100)
  );

  return (
    <div
      className={`mx-3 mb-3 rounded-xl border px-3 py-2.5 transition-all duration-500 ${config.bgColor}`}
    >
      {/* Top row: label + char count */}
      <div className="flex items-center justify-between mb-1.5">
        <span className={`text-[11px] font-medium ${config.textColor}`}>
          {config.emoji} {config.label}
        </span>
        <span className="text-[11px] text-zinc-400 tabular-nums">
          {contentChars.toLocaleString()} / {CHAR_THRESHOLDS.IDEAL_MAX.toLocaleString()} chars
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-zinc-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${config.barColor}`}
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}
