import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, Link as LinkIcon, Type, Highlighter } from 'lucide-react';

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function TextEditor({ content, onChange }: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-600 underline',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const MenuButton = ({ onClick, isActive, icon: Icon, label }: any) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${
        isActive ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100 text-gray-600'
      }`}
      title={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center space-x-1 p-2 border-b bg-gray-50">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={Bold}
          label="Bold"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={Italic}
          label="Italic"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={List}
          label="Bullet List"
        />
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <MenuButton
          onClick={() => {
            const url = window.prompt('Enter URL');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          isActive={editor.isActive('link')}
          icon={LinkIcon}
          label="Add Link"
        />
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <select
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="p-1 rounded border bg-white text-sm"
        >
          <option value="inherit">Default</option>
          <option value="#ef4444">Red</option>
          <option value="#3b82f6">Blue</option>
          <option value="#22c55e">Green</option>
          <option value="#f59e0b">Orange</option>
        </select>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive('highlight') ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <Highlighter className="w-4 h-4" />
        </button>
      </div>
      <EditorContent 
        editor={editor} 
        className="prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none"
      />
    </div>
  );
}