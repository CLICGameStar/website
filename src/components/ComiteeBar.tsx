import ComiteeCard from "./ComiteeCard";

export default function ComiteeBar({
  comitees,
}: {
  comitees: {
    name: string;
    surname: string;
    role: string;
    link: string;
    image: string;
  }[];
}) {
  return (
    <div className="comitee-bar">
      {comitees
        .sort((a, b) =>
          // Sort first coordinator, then treasurer, then alphabetically by role
          a.role === "Coordinator"
            ? -1
            : b.role === "Coordinator"
              ? 1
              : a.role === "Treasurer"
                ? -1
                : b.role === "Treasurer"
                  ? 1
                  : a.role.localeCompare(b.role),
        )
        .map((member, i) => (
          <ComiteeCard
            key={i}
            name={member.name}
            surname={member.surname}
            role={member.role}
            link={member.link}
            image={member.image}
          />
        ))}
    </div>
  );
}
