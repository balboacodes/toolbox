export default function Header() {
  return (
    <header class="flex items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5ea500"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-6"
      >
        <path d="m7 11 2-2-2-2" />
        <path d="M11 13h4" />
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      </svg>
      <span class="text-xl">Toolbox</span>
    </header>
  );
}
