export default function LangIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M4 5h7M9 3v2c0 4.418-2.239 8-5 8"></path>
        <path d="M5 9c0 2.144 2.952 3.908 6.7 4m.3 7l4-9l4 9m-.9-2h-6.2"></path>
      </g>
    </svg>
  );
}
