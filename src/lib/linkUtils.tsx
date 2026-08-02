import React from 'react';

/**
 * Parses text and converts any plain URLs (http://, https://, www.) into clickable React <a> elements.
 */
export function renderTextWithLinks(text: string | null | undefined): React.ReactNode {
  if (!text) return null;

  // Regex to match URLs starting with http://, https://, or www.
  const urlRegex = /(https?:\/\/[^\s<]+|www\.[^\s<]+)/gi;

  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (/^(https?:\/\/|www\.)/i.test(part)) {
      let cleanUrl = part;
      let trailingPunctuation = '';
      const matchPunctuation = cleanUrl.match(/([.,;:!?)]+)$/);
      if (matchPunctuation) {
        trailingPunctuation = matchPunctuation[0];
        cleanUrl = cleanUrl.slice(0, cleanUrl.length - trailingPunctuation.length);
      }

      const href = cleanUrl.toLowerCase().startsWith('www.') ? `https://${cleanUrl}` : cleanUrl;

      return (
        <React.Fragment key={index}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-brand-gold underline hover:text-amber-300 font-semibold break-all transition-colors underline-offset-2"
          >
            {cleanUrl}
          </a>
          {trailingPunctuation}
        </React.Fragment>
      );
    }
    return part;
  });
}
