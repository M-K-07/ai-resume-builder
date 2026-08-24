import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';

export async function formatMarkdown(markdown) {
  if (!markdown) return "";

  // Normalise: if the AI returned plain lines (no "- " prefix but one sentence per line),
  // convert them to markdown list items so remark treats them as <ul><li>
  const lines = markdown.trim().split("\n").map(l => l.trim()).filter(Boolean);

  const isBulletLine = (l) => /^[-*•]\s/.test(l);
  const allAreBullets = lines.every(isBulletLine);
  const noneAreBullets = lines.every(l => !isBulletLine(l));

  let normalised = markdown.trim();

  if (noneAreBullets && lines.length === 1) {
    // Single paragraph — split into sentences and convert to bullets
    const sentences = lines[0]
      .split(/(?<=\.)\s+/)
      .map(s => s.trim())
      .filter(Boolean);
    if (sentences.length > 1) {
      normalised = sentences.map(s => `- ${s}`).join("\n");
    } else {
      // Only one sentence — still make it a bullet
      normalised = `- ${lines[0]}`;
    }
  } else if (noneAreBullets && lines.length > 1) {
    // Plain paragraph lines — convert each to a markdown bullet
    normalised = lines.map(l => `- ${l}`).join("\n");
  } else if (!allAreBullets && lines.some(isBulletLine)) {
    // Mixed: ensure every non-empty, non-bullet line becomes a bullet
    normalised = lines.map(l => (isBulletLine(l) ? l : `- ${l}`)).join("\n");
  }
  // Replace • with - so remark recognises them
  normalised = normalised.replace(/^•\s/gm, "- ");

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(normalised);

  return String(file);
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
