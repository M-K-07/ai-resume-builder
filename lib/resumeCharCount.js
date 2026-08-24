/**
 * resumeCharCount.js
 *
 * Computes content-only character count for a resume, used to determine
 * whether it fits on a single A4 page.
 *
 * "Content" = descriptive text only (summaries, bullet descriptions).
 * Excluded: headings, name, contact info, company/school names, dates, etc.
 *
 * Target range: 2400–3000 chars = clean single-page resume
 */

// Strip HTML tags produced by the WYSIWYG editor, collapse whitespace
function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>/g, " ")   // replace tags with a space
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")       // collapse multiple spaces/newlines
    .trim();
}

// ── Thresholds ──────────────────────────────────────────────────────────────
export const CHAR_THRESHOLDS = {
  MIN: 1200,       // resume looks sparse below this
  IDEAL_MAX: 2600, // perfect single-page range (~330-370 words)
  OVERFLOW: 2850,  // spilling onto page 2
};

// ── Per-section default budgets (when generating concise single-page content) ───────────
export const SECTION_BUDGETS = {
  summary: 320,          // ~45 words (2-3 sentences)
  perExperience: 340,    // ~45 words (2 concise bullets per role)
  perProject: 380,       // ~50 words (2-3 concise bullets per project)
  perAchievement: 130,   // ~15-20 words (1 punchy sentence)
};

/**
 * Main function — call this with the full resumeData object.
 * Returns { contentChars, breakdown, status, budgetLeft, sectionBudgets }
 */
export function calcResumeCharCount(resumeData) {
  if (!resumeData) {
    return {
      contentChars: 0,
      breakdown: {},
      status: "too-short",
      budgetLeft: CHAR_THRESHOLDS.IDEAL_MAX,
      sectionBudgets: SECTION_BUDGETS,
    };
  }

  // 1. Summary
  const summaryChars = stripHtml(resumeData.summary || "").length;

  // 2. Work Experience — only descriptions
  const experienceChars = (resumeData.workExperience || []).reduce(
    (total, exp) => total + stripHtml(exp.description || "").length,
    0
  );

  // 3. Projects — only descriptions
  const projectChars = (resumeData.projects || []).reduce(
    (total, proj) => total + stripHtml(proj.description || "").length,
    0
  );

  // 4. Achievements — only descriptions
  const achievementChars = (resumeData.achievements || []).reduce(
    (total, ach) => total + stripHtml(ach.description || "").length,
    0
  );

  // 5. Skills — count them as content too (brief)
  const skillsText = Array.isArray(resumeData.skills)
    ? resumeData.skills.join(", ")
    : resumeData.skills || "";
  const skillsChars = skillsText.length;

  const contentChars =
    summaryChars + experienceChars + projectChars + achievementChars + skillsChars;

  // ── Status ────────────────────────────────────────────────────────────────
  let status;
  if (contentChars < CHAR_THRESHOLDS.MIN) {
    status = "too-short";
  } else if (contentChars <= CHAR_THRESHOLDS.IDEAL_MAX) {
    status = "ideal";
  } else if (contentChars <= CHAR_THRESHOLDS.OVERFLOW) {
    status = "almost-full";
  } else {
    status = "overflow";
  }

  const budgetLeft = Math.max(0, CHAR_THRESHOLDS.IDEAL_MAX - contentChars);

  // ── Dynamic per-section budgets for AI calls ──────────────────────────────
  // When generating for a specific section, pass its budget so AI knows
  // exactly how long to be. Budget = default budget + its share of whatever space remains.
  const expCount = Math.max(1, (resumeData.workExperience || []).length);
  const projCount = Math.max(1, (resumeData.projects || []).length);
  const achCount = Math.max(1, (resumeData.achievements || []).length);

  const sectionBudgets = {
    summary: Math.min(
      SECTION_BUDGETS.summary + Math.round(budgetLeft * 0.15),
      350
    ),
    perExperience: Math.min(
      Math.round(SECTION_BUDGETS.perExperience + (budgetLeft * 0.45) / expCount),
      420
    ),
    perProject: Math.min(
      Math.round(SECTION_BUDGETS.perProject + (budgetLeft * 0.35) / projCount),
      450
    ),
    perAchievement: Math.min(
      Math.round(SECTION_BUDGETS.perAchievement + (budgetLeft * 0.1) / achCount),
      160
    ),
  };

  return {
    contentChars,
    breakdown: {
      summary: summaryChars,
      experience: experienceChars,
      projects: projectChars,
      achievements: achievementChars,
      skills: skillsChars,
    },
    status,
    budgetLeft,
    sectionBudgets,
  };
}
