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
          // Sort with Coordinator > Treasurer > others
          // Use startsWith so it works in French too (Coordinateur, Trésorier)
          a.role.startsWith("Coord") // Coordinator
            ? -1
            : b.role.startsWith("Coord") // Coordinator
              ? 1
              : a.role.startsWith("Tr") // Treasurer
                ? -1
                : b.role.startsWith("Tr") // Treasurer
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
