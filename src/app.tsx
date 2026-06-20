import { useComputed, useSignal } from "@preact/signals";
import { TargetedEvent } from "preact";
import FilteredTools from "./components/FilteredTools.tsx";
import GetCommands from "./components/GetCommands.tsx";
import SearchTools from "./components/SearchTools.tsx";
import SelectedTools from "./components/SelectedTools.tsx";
import SelectOs from "./components/SelectOs.tsx";
import tools from "./tools.json" with { type: "json" };
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

export type Tool = { version: string; commands: string };

const os = Object.keys(tools);

export function App() {
  const selectedOs = useSignal("");
  const search = useSignal("");
  const filteredTools = useComputed(() => {
    if (!selectedOs.value || !os.includes(selectedOs.value)) return [];

    return Object.entries<Tool[]>(tools[selectedOs.value])
      .filter(([tool]) =>
        tool.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
      )
      .map(([name, versions]) => ({ name, versions }));
  });

  const selectedTools = useSignal<Map<string, Tool>>(new Map());

  return (
    <div class="min-h-dvh font-mono p-4 flex flex-col gap-8 text-sm bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />

      <div class="flex justify-center flex-1">
        <div class="flex flex-col gap-8 w-full max-w-xl">
          <div class="flex flex-col gap-2">
            <SelectOs
              onChange={(e: TargetedEvent<HTMLInputElement>) => {
                selectedOs.value = e.currentTarget.value;
                selectedTools.value = new Map();
                document
                  .querySelectorAll("input[data-select-tool]:checked")
                  .forEach((
                    input: HTMLInputElement,
                  ) => (input.checked = false));
              }}
              selectedOs={selectedOs}
            />
            <SearchTools
              onInput={(
                e: TargetedEvent<HTMLInputElement>,
              ) => (search.value = e.currentTarget.value)}
              selectedOs={selectedOs}
            />
            <GetCommands selectedTools={selectedTools} />
          </div>
          {!!selectedTools.value.size && (
            <div>
              <SelectedTools selectedTools={selectedTools} />
            </div>
          )}
          {selectedOs.value && (
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <FilteredTools
                filteredTools={filteredTools}
                selectedTools={selectedTools}
              />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
