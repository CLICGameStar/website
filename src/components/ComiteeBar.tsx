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
        .sort(
          (a, b) =>
            // by role (anti alphabetically so that Coordinator is before Committee)
            b.role.localeCompare(a.role) || a.surname.localeCompare(b.surname),
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
