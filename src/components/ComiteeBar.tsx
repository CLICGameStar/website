import ComiteeCard from "./ComiteeCard";

export default function ComiteeBar({
  comitees,
}: {
  comitees: {
    name: string;
    role: string;
    link: string;
    image: string;
  }[];
}) {
  return (
    <div className="comitee-bar">
      {comitees.map((member, i) => (
        <ComiteeCard
          key={i}
          name={member.name}
          role={member.role}
          link={member.link}
          image={member.image}
        />
      ))}
    </div>
  );
}
