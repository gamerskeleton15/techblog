import sanitizeHtml from 'sanitize-html';

/**
 * Allow-list of tags + attributes sanitize-html keeps when rendering post
 * content. This is the set remark-html produces from Markdown, plus tables
 * and inline links. Everything else (scripts, event handlers, iframes,
 * unknown elements) is stripped.
 */
const ALLOWED_TAGS = [
  'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'a', 'img',
  'strong', 'em', 'b', 'i',
  'code', 'pre',
  'blockquote', 'hr', 'br',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'del', 'sup', 'sub',
];

const ALLOWED_ATTRS: Record<string, string[]> = {
  a: ['href', 'title', 'rel', 'target'],
  img: ['src', 'alt', 'title', 'width', 'height'],
  code: ['class'],
  pre: ['class'],
};

/**
 * Sanitize raw HTML (e.g. rendered Markdown) so it is safe to inject into the
 * DOM via dangerouslySetInnerHTML. Strips scripts, event handler attributes,
 * and any javascript: URLs. Leaves relative paths (internal links and
 * /uploads/… images) intact.
 */
export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRS,
    // No `data:` scheme: data:image/svg+xml is an XSS vector and the app only
    // serves real image files under /uploads. Relative paths handled below.
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: { img: ['http', 'https'] },
    allowProtocolRelative: true,
  });
}