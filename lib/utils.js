import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';

export async function formatMarkdown(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat) 
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
