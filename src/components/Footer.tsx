export default function Footer() {
  return (
    <footer class="flex justify-between gap-4">
      <div>
        Can't find your tool?{" "}
        <a
          class="underline"
          href="https://github.com/balboacodes/toolbox"
          target="_blank"
        >
          Submit a pull request
        </a>{" "}
        to add it.
      </div>
      <div>
        Made by&nbsp;
        <a
          class="underline"
          href="https://github.com/balboacodes"
          target="_blank"
        >
          Balboa Codes
        </a>
      </div>
    </footer>
  );
}
