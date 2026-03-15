'use client';

import { ChapterSection } from '@/types/course';
import { ILLUSTRATION_REGISTRY } from '@/components/illustrations';

interface ChapterContentProps {
  sections: ChapterSection[];
}

function renderContent(content: string) {
  const lines = content.split('\n');

  return lines.map((line, i) => {
    if (line.trim() === '') return <br key={i} />;

    // Convert **bold** to <strong>
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j} className="text-gray-100 font-semibold">{part.slice(2, -2)}</strong>;
      }
      return <span key={j}>{part}</span>;
    });

    // Handle list items
    if (line.trimStart().startsWith('- ')) {
      return (
        <li key={i} className="ml-4 list-disc text-gray-400 text-sm sm:text-base leading-relaxed">
          {rendered}
        </li>
      );
    }

    return (
      <p key={i} className="text-gray-400 text-sm sm:text-base leading-relaxed">
        {rendered}
      </p>
    );
  });
}

export default function ChapterContent({ sections }: ChapterContentProps) {
  return (
    <div className="space-y-10">
      {sections.map((section, idx) => {
        const Illustration = section.illustration
          ? ILLUSTRATION_REGISTRY[section.illustration]
          : null;

        return (
          <div key={idx} className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-gray-100 border-b border-gray-800/40 pb-2">
              {section.heading}
            </h2>
            <div className="space-y-2">
              {renderContent(section.content)}
            </div>
            {Illustration && (
              <div className="pt-3">
                <Illustration />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
