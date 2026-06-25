import { InputEventHandler, SVGAttributes } from "preact";
import LinuxLogo from "./LinuxLogo.tsx";
import MacOsLogo from "./MacOsLogo.tsx";
import WindowsLogo from "./WindowsLogo.tsx";
import { Signal } from "@preact/signals";

const os = [
  {
    name: "Linux",
    svg: (props: SVGAttributes<SVGSVGElement>) => <LinuxLogo {...props} />,
  },
  {
    name: "macOS",
    svg: (props: SVGAttributes<SVGSVGElement>) => <MacOsLogo {...props} />,
  },
  {
    name: "Windows",
    svg: (props: SVGAttributes<SVGSVGElement>) => <WindowsLogo {...props} />,
  },
];

export default function SelectOs({
  onChange,
  selectedOs,
}: {
  onChange: InputEventHandler<HTMLInputElement>;
  selectedOs: Signal<string>;
}) {
  return (
    <div class="grid grid-cols-3 gap-2 rounded-xl p-2">
      {os.map((o) => (
        <label
          key={o.name}
          class={`transition relative flex justify-center rounded-xl ${
            selectedOs.value === o.name && "bg-gray-200 dark:bg-gray-700/50"
          }`}
        >
          {o.svg({ class: "size-10 fill-current" })}
          <input
            onChange={onChange}
            type="radio"
            name="os"
            value={o.name}
            class="appearance-none absolute w-full h-full rounded-xl"
          />
        </label>
      ))}
    </div>
  );
}
