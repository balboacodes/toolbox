import { Signal } from "@preact/signals";
import { Tool } from "../app.tsx";
import { Badge, Badges } from "./Badge.tsx";

export default function SelectedTools(
  { selectedTools }: { selectedTools: Signal<Map<string, Tool>> },
) {
  function onRemoveSelectedTool(toolName: string) {
    selectedTools.value.delete(toolName);
    selectedTools.value = new Map(selectedTools.value);
  }

  return (
    <Badges>
      {selectedTools.value
        .entries()
        .toArray()
        .map(([toolName, tool]) => (
          <Badge key={toolName}>
            <button
              onClick={() => onRemoveSelectedTool(toolName)}
              class="cursor-pointer inline-flex items-center"
              type="button"
            >
              {toolName} ({tool.version})
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="size-3"
              >
                {toolName} ({tool.version})
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-3"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </Badge>
          ),
        )}
    </Badges>
  );
}
