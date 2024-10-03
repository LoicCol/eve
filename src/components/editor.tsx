"use client";

import {
  BoldItalicUnderlineToggles,
  MDXEditor,
  MDXEditorMethods,
  UndoRedo,
  headingsPlugin,
  listsPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import React from "react";
import { FC } from "react";
import "@mdxeditor/editor/style.css";

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
  onChange: (markdown: string) => void;
  readOnly: boolean;
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: FC<EditorProps> = ({
  markdown,
  onChange,
  readOnly,
  editorRef,
}) => {
  return (
    <MDXEditor
      onChange={onChange}
      ref={editorRef}
      markdown={markdown}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        toolbarPlugin({
          toolbarContents: () =>
            !readOnly && (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
              </>
            ),
        }),
      ]}
      readOnly={readOnly}
      autoFocus
    />
  );
};

export default Editor;
