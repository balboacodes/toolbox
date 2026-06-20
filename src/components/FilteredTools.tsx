import { ReadonlySignal, Signal } from "@preact/signals";
import { Tool } from "../app.tsx";
import { Badge } from "./Badge.tsx";

export default function FilteredTools(
  { filteredTools, selectedTools }: {
    filteredTools: ReadonlySignal<{
      name: string;
      versions: Tool[];
    }[]>;
    selectedTools: Signal<Map<string, Tool>>;
  },
) {
  function onToolSelect(isChecked: boolean, toolName: string, version: Tool) {
    if (isChecked) {
      selectedTools.value.set(toolName, version);
      selectedTools.value = new Map(selectedTools.value);
      return;
    }

    selectedTools.value.delete(toolName);
    selectedTools.value = new Map(selectedTools.value);
  }

  return (
    <>
      {filteredTools.value.map(
        (tool) => (
          <>
            {tool.versions.map(
              (version) => (
                <div
                  key={tool.name}
                  class={`transition relative flex items-center justify-between outline -outline-offset-1 outline-gray-300 dark:outline-gray-500 hover:outline-gray-400 dark:hover:outline-gray-400 rounded-xl p-2 ${
                    selectedTools.value.has(tool.name) &&
                    "outline-2 -outline-offset-2 outline-lime-600 dark:outline-lime-600"
                  }`}
                >
                  <input
                    onChange={(e) =>
                      onToolSelect(
                        e.currentTarget.checked,
                        tool.name,
                        version,
                      )}
                    checked={selectedTools.value.has(tool.name)}
                    data-select-tool
                    class="appearance-none rounded-xl absolute top-0 left-0 w-full h-full"
                    type="checkbox"
                  />
                  <div class="truncate">{tool.name}</div>
                  <Badge>{version.version}</Badge>
                </div>
              ),
            )}
          </>
        ),
      )}
    </>
  );
}
