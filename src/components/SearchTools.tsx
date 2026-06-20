import { Signal } from "@preact/signals";
import { InputEventHandler } from "preact";

export default function SearchTools(
  { onInput, selectedOs }: {
    onInput: InputEventHandler<HTMLInputElement>;
    selectedOs: Signal<string>;
  },
) {
  return (
    <input
      onInput={onInput}
      disabled={!selectedOs.value}
      class="block w-full p-2 outline -outline-offset-1 outline-gray-300 dark:outline-gray-500 rounded-xl"
      type="search"
      placeholder={selectedOs.value
        ? "Search tools"
        : "Choose your OS to search tools"}
    />
  );
}
