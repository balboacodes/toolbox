import { Signal, useComputed, useSignal } from "@preact/signals";
import { Tool } from "../app.tsx";
import { Badge, Badges } from "./Badge.tsx";

export default function GetCommands(
  { selectedTools }: { selectedTools: Signal<Map<string, Tool>> },
) {
  const commands = useComputed(() =>
    selectedTools.value
      .values()
      .toArray()
      .map((selectedTool) => selectedTool.commands)
      .join(" && ")
  );

  const copied = useSignal(false);

  async function onCopied() {
    await navigator.clipboard.writeText(commands.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 3000);
  }

  return (
    <>
      <button
        command="show-modal"
        commandfor="commands-dialog"
        disabled={!selectedTools.value.size}
        class="cursor-pointer p-2 rounded-xl block w-full bg-lime-600 text-gray-100 disabled:cursor-default disabled:bg-lime-600/50 dark:disabled:bg-lime-600/50 dark:disabled:text-gray-400"
        type="button"
      >
        Get commands
      </button>
      <dialog
        id="commands-dialog"
        aria-labelledby="dialog-title"
        closedby="any"
        class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50">
        </div>
        <div
          tabindex={0}
          class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0"
        >
          <div class="relative transform overflow-hidden rounded-lg bg-gray-100 text-left shadow-xl transition-all data-closed:trangray-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:trangray-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10">
            <div class="p-4">
              <div class="absolute top-0 right-0 pt-4 pr-4 block">
                <button
                  onClick={onCopied}
                  class="cursor-pointer rounded-sm"
                  type="button"
                >
                  <span class="[clip-path:inset(50%)] whitespace-nowrap border-none w-px height-px -m-px p-0 absolute overflow-hidden">
                    Copy
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class={`size-6 ${copied.value && "hidden"}`}
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class={`size-6 ${!copied.value && "hidden"}`}
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </button>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:text-left space-y-4">
                <h3
                  id="dialog-title"
                  class="text-base font-semibold "
                >
                  Commands
                </h3>
                <Badges>
                  {selectedTools.value
                    .entries()
                    .toArray()
                    .map(([toolName, tool]) => (
                      <Badge>{toolName} ({tool.version})</Badge>
                    ))}
                </Badges>
                <div class="overflow-scroll">
                  <code class="mt-2">{commands}</code>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 p-4 dark:bg-gray-700">
              <button
                type="button"
                command="close"
                commandfor="commands-dialog"
                class="cursor-pointer inline-flex gap-1 w-full justify-center items-center rounded-lg bg-white p-2 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:w-auto dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
              >
                Close
                <kbd class="text-xs/4 block">[esc]</kbd>
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
