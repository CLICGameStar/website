import ComiteeCard from "./ComiteeCard";

export default function PeopleBar({
  people,
}: {
  people: {
    name: string;
    surname: string;
    role: string;
    link: string;
    image: string;
  }[];
}) {
  return (
    <div className="comitee-bar">
      {people.map((person, i) => (
        <ComiteeCard
          key={i}
          name={person.name}
          surname={person.surname}
          role={person.role}
          link={person.link}
          image={person.image}
        />
      ))}
    </div>
  );
}
