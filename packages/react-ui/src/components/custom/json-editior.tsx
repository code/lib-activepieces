import { json } from '@codemirror/lang-json';
import { githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror, { EditorState, EditorView } from '@uiw/react-codemirror';
import { useState } from 'react';

const styleTheme = EditorView.baseTheme({
  '&.cm-editor.cm-focused': {
    outline: 'none',
  },
});

type JsonEditorProps = {
  initial: string;
  onChange: (value: unknown) => void;
  readonly?: boolean;
};

const convertToString = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }
  return JSON.stringify(value, null, 2);
};

const tryParseJson = (value: unknown): unknown => {
  if (typeof value !== 'string') {
    return value;
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

const JsonEditor = ({
  initial,
  onChange,
  readonly = false,
}: JsonEditorProps) => {
  const extensions = [
    styleTheme,
    EditorState.readOnly.of(readonly),
    EditorView.editable.of(!readonly),
    json(),
  ];

  const [value, setValue] = useState(convertToString(initial));

  return (
    <div className="flex flex-col gap-2 border rounded py-2 px-2">
      <CodeMirror
        value={value}
        className="border-none"
        height="250px"
        width="100%"
        maxWidth="100%"
        basicSetup={{
          foldGutter: false,
          lineNumbers: true,
          searchKeymap: false,
          lintKeymap: true,
          autocompletion: true,
        }}
        lang="json"
        onChange={(value) => {
          setValue(value);
          onChange(tryParseJson(value));
        }}
        theme={githubLight}
        readOnly={readonly}
        extensions={extensions}
      />
    </div>
  );
};

export { JsonEditor };