export const PROMPTS = {
  /**
   * SUMMARY
   * Target: ~40-50 words / 300-350 chars (matching demo resume)
   * {CharBudget} = target characters
   */
  SUMMARY:
    "Write a concise, high-impact professional resume summary for a {JobTitle} with {Experience} of experience. " +
    "Skills include: {Skills}. Tailor it tightly to this job description: {JobDescription}. " +
    "Rules: write in third-person omitting the name, STRICT WORD COUNT LIMIT: 40–50 words max (do not exceed {CharBudget} characters). " +
    "Keep it to 2–3 short, impactful sentences highlighting technical expertise, end-to-end capabilities, and real-world value. " +
    "No filler words (passionate, dynamic, results-driven, synergy), no bold formatting, no headers, no introductory phrases like 'Here is'. " +
    "Output only the plain summary paragraph — plain text, no bullet points.",

  /**
   * EXPERIENCE
   * Dynamic: AI decides 2 to MAX 4 bullet points based on provided detail, strictly under {CharBudget} chars total
   * Each bullet MUST start with "- " (hyphen space) for markdown list parsing.
   */
  EXPERIENCE:
    "Rewrite this work experience: \"{UserProvidedDescription}\". " +
    "Target job: {JobDescription}. " +
    "Analyze the provided details and dynamically decide the optimal number of bullet points to generate (minimum 2 bullets, MAXIMUM 4 bullets). " +
    "IMPORTANT FORMAT: Each bullet point MUST start with '- ' (a hyphen followed by a space). " +
    "Example format:\n- Developed and integrated a RAG-based AI chatbot to deliver context-aware responses and improve knowledge retrieval.\n- Designed and optimized the LMS portal with a focus on performance, responsiveness, and seamless user experience.\n" +
    "Rules: STRICT BUDGET: total characters across all bullets MUST NOT exceed {CharBudget} characters (maximum 4 bullet points total). Adjust the length of each bullet so the combined list fits tightly within the character budget. " +
    "Each bullet starts with a strong past-tense action verb (e.g. Developed, Implemented, Led, Built, Designed, Optimized). " +
    "CRITICAL: Do NOT invent or add fake/hallucinated numerical percentage metrics or stats (e.g. 'by 40%', 'reducing load by 3.5x') unless explicitly provided in the user's input text. Focus on technical architecture, functionality, and real-world software impact. " +
    "No long descriptions, no bold formatting, no placeholders, no introductory text. " +
    "Output ONLY the bullet points, each on its own line starting with '- '.",

  /**
   * PROJECT
   * Dynamic: AI decides 2 to MAX 4 bullet points based on provided detail, strictly under {CharBudget} chars total
   * Each bullet MUST start with "- " (hyphen space) for markdown list parsing.
   */
  PROJECT:
    "Rewrite this project description: \"{UserProvidedProjectDescription}\". " +
    "Technologies: {TechnologiesUsed}. Job context: {jobDescription}. " +
    "Analyze the provided details and dynamically decide the optimal number of bullet points to generate (minimum 2 bullets, MAXIMUM 4 bullets). " +
    "IMPORTANT FORMAT: Each bullet point MUST start with '- ' (a hyphen followed by a space). " +
    "Example format:\n- Built a full-featured dynamic resume builder using Next.js, MongoDB, Gemini API, and Tailwind CSS.\n- Implemented a real-time editing interface with live preview, enabling instant updates and PDF exports.\n- Designed a sleek and responsive UI for enhanced user experience and smooth interactions across devices.\n" +
    "Rules: STRICT BUDGET: total characters across all bullets MUST NOT exceed {CharBudget} characters (maximum 4 bullet points total). Adjust the length of each bullet so the combined list fits tightly within the character budget. " +
    "Bullet 1 = core project purpose + main technology stack used, " +
    "Subsequent bullets = key features, architecture, pipeline, UI/UX optimization, or system capabilities, " +
    "each bullet starts with a strong action verb, " +
    "CRITICAL: Do NOT invent or add fake/hallucinated numerical percentage metrics or stats unless explicitly provided in the input text. Focus on clear engineering functionality and real-world system value. " +
    "No 'I built', no marketing fluff, no bold formatting, no placeholders, no introductory text. " +
    "Output ONLY the bullet points, each on its own line starting with '- '.",

  /**
   * ACHIEVEMENTS
   * Target: 1 concise bullet point, strictly under {CharBudget} chars
   */
  ACHIEVEMENTS:
    "Write a single concise resume bullet point for this achievement — title: \"{AchievementTitle}\", details: \"{UserProvidedAchievementDescription}\". " +
    "IMPORTANT FORMAT: The bullet point MUST start with '- ' (a hyphen followed by a space). " +
    "Rules: STRICT BUDGET: under {CharBudget} characters (15–20 words max), " +
    "lead with a strong action verb or role title, " +
    "CRITICAL: Do NOT add fake or hallucinated metrics. " +
    "No bold formatting, no introductory phrases. " +
    "Output ONLY the bullet point starting with '- '.",
};