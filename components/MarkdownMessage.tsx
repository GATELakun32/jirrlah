'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Copy } from 'lucide-react';

interface MarkdownMessageProps {
  content: string;
  onCopy?: (text: string) => void;
}

export default function MarkdownMessage({ content, onCopy }: MarkdownMessageProps) {
  return (
    <div className="prose prose-invert max-w-none prose-pre:relative prose-pre:bg-[#0c0c0c] prose-pre:border prose-pre:border-primary-900 prose-pre:rounded-xl prose-pre:p-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre({ children }) {
            const text = (children as any)?.[0]?.props?.children?.[0] ?? '';
            return (
              <div className="relative group">
                <pre className="overflow-auto p-4">{children}</pre>
                <button
                  onClick={() => onCopy?.(String(text))}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#141414] border border-primary-900 text-secondary-200 px-2 py-1 rounded-md flex items-center gap-1 text-xs"
                  title="Salin kode"
                >
                  <Copy size={14} /> Salin
                </button>
              </div>
            );
          },
          code({ inline, className, children, ...props }: any) {
            if (inline) {
              return <code className="bg-[#141414] border border-primary-900 px-1.5 py-0.5 rounded-md" {...props}>{children}</code>;
            }
            return <code className={className} {...props}>{children}</code>;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}


