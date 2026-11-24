const paths = {
  right: "6 3 11 8 6 13",
  left: "10 3 5 8 10 13",
  up: "3 10 8 5 13 10",
  down: "3 6 8 11 13 6",
};

export default function Chevron({ direction = "right" }: { direction?: keyof typeof paths }) {
  return (
    <svg aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 0 16 16"
      style={{ verticalAlign: "-0.14em" }} fill="none" stroke="currentColor" strokeWidth="1.65"
      strokeLinecap="round" strokeLinejoin="round">
      <polyline points={paths[direction]} />
    </svg>
  );
}
