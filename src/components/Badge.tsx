import { ComponentChildren } from "preact";

export function Badges({ children }: { children: ComponentChildren }) {
  return (
    <div class="flex flex-wrap gap-2">
      {children}
    </div>
  );
}

export function Badge({ children }: { children: ComponentChildren }) {
  return (
    <div class="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-500 inset-ring inset-ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:inset-ring-gray-400/20">
      {children}
    </div>
  );
}
