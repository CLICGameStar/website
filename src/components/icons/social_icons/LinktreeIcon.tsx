export default function LinktreeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 10h16M6.5 4.5l11 11m-11 0l11-11M12 10V2m0 13v7"
      ></path>
    </svg>
  );
}
