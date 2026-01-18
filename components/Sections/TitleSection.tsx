import { Sparkles } from "lucide-react";

export function TitleSection({
  title,
  subTitle,
}: {
  title: [string, string];
  subTitle: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em]">
        {subTitle ? (
          <>
            <Sparkles className="h-4 w-4" /> <span>{subTitle}</span>
          </>
        ) : null}
      </div>
      <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white">
        {title[0]} <span className="text-blue-600">{title[1]}</span>
      </h2>
    </div>
  );
}
