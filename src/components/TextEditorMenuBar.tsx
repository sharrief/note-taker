import React from 'react';
import { Editor, useCurrentEditor } from '@tiptap/react';
import { FaListUl, FaListOl, FaQuoteLeft } from 'react-icons/fa';
import useBoldButton from '@/hooks/useBoldButton';
import useItalicButton from '@/hooks/useItalicButton';
import useStrikeButton from '@/hooks/useStrikeButton';
import useBulletListButton from '@/hooks/useBulletListButton';
import useOrderedListButton from '@/hooks/useOrderedListButton';
import useBlockQuoteButton from '@/hooks/useBlockQuoteButton';
import useHeadingButton, { HeadingLevel } from '@/hooks/useHeadingButton';

export type TextEditorMenuBarProps = { editor: Editor };

export default function TextEditorMenuBar() {
  const { editor } = useCurrentEditor();
  const bold = useBoldButton(editor);
  const italic = useItalicButton(editor);
  const strike = useStrikeButton(editor);
  const bulletList = useBulletListButton(editor);
  const orderedList = useOrderedListButton(editor);
  const blockQuote = useBlockQuoteButton(editor);
  const heading = useHeadingButton(editor);
  return (
    <div className="flex font-serif flex-wrap join my-2">
      <button
        type="button"
        className={`
        btn font-bold btn-outline join-item p-2 min-h-0 h-auto text-lg 
        ${bold.isActive ? 'btn-active' : ''}`}
        onClick={bold.toggle}
        disabled={!bold.canToggle}
      >
        B
      </button>
      <button
        type="button"
        className={`
        btn font-normal italic btn-outline join-item p-2 min-h-0 h-auto text-lg 
        ${italic.isActive ? 'btn-active' : ''}`}
        onClick={italic.toggle}
        disabled={!italic.canToggle}
      >
        I
      </button>
      <button
        type="button"
        className={`
        btn font-normal line-through btn-outline join-item p-2 min-h-0 h-auto text-lg 
        ${strike.isActive ? 'btn-active' : ''}`}
        onClick={strike.toggle}
        disabled={!strike.canToggle}
      >
        S
      </button>
      <button
        type="button"
        className={`
        btn font-normal btn-outline join-item p-2 min-h-0 h-auto text-lg 
        ${bulletList.isActive ? 'btn-active' : ''}`}
        onClick={bulletList.toggle}
        disabled={!bulletList.canToggle}
      >
        <FaListUl />
      </button>
      <button
        type="button"
        className={`
        btn font-normal btn-outline join-item p-2 min-h-0 h-auto text-lg 
        ${orderedList.isActive ? 'btn-active' : ''}`}
        onClick={orderedList.toggle}
        disabled={!orderedList.canToggle}
      >
        <FaListOl />
      </button>
      <button
        type="button"
        className={`
        btn font-normal btn-outline join-item p-2 min-h-0 h-auto text-lg 
        ${blockQuote.isActive ? 'btn-active' : ''}`}
        onClick={blockQuote.toggle}
        disabled={!blockQuote.canToggle}
      >
        <FaQuoteLeft />
      </button>
      <select
        className="select select-bordered join-item bg-dark text-lg"
        value={heading.active}
        onChange={(e) => heading.toggleHeading(+(e.target.value) as HeadingLevel)}
      >
        <option value="">
          -
        </option>
        {heading.levels.map((l) => (
          <option key={l} value={l}>
            H
            {l}
          </option>
        ))}
      </select>
    </div>
  );
}
