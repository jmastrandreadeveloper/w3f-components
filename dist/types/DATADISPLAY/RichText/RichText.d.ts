import React from 'react';
/**
 * W3F RichText — a short text with a small markdown subset (w3f-data-analysis, text tiles of the boards):
 *
 *   # Title            → big bold line
 *   ## Subtitle        → medium bold line
 *   ### Small title    → bold line
 *   - item             → bullet
 *   **bold**, *italic*
 *   [text](https://…)  → link (only http(s):, mailto: or #anchor; anything else stays as text)
 *   (blank line)       → space between paragraphs
 *
 * No HTML is read: the text is parsed into React elements, so it is safe with any text.
 */
export interface RichTextProps {
    text?: string;
    /** 'left' | 'center' | 'right' | 'justify'. */
    align?: 'left' | 'center' | 'right' | 'justify';
    /** Base font size (CSS). The titles grow from it. */
    size?: string;
    color?: string;
    /** Base font weight (the paragraphs; titles are always bold). */
    weight?: number | string;
    /** 'text' (underlined) or 'button' (the links look like buttons: a «go to» tile of a board). */
    linkStyle?: 'text' | 'button';
    className?: string;
    style?: React.CSSProperties;
}
export type RichBlock = {
    kind: 'h1' | 'h2' | 'h3' | 'p' | 'li';
    runs: RichRun[];
} | {
    kind: 'gap';
};
export type RichRun = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    href?: string;
};
/** A link target that is safe to put in an <a href>: http(s):, mailto: or #anchor. */
export declare function safeHref(href: string): string | null;
/** **bold**, *italic* and [text](link) inside a line (unclosed marks and unsafe links stay as text). */
export declare function parseInline(line: string): RichRun[];
/** The blocks of a text (one per line; consecutive blank lines are one gap). */
export declare function parseRichText(text: string): RichBlock[];
export declare const RichText: React.FC<RichTextProps>;
export default RichText;
//# sourceMappingURL=RichText.d.ts.map