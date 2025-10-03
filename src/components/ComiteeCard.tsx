import DirectusImage from "./DirectusImage";

export default function ComiteeCard({
  name,
  surname,
  role,
  link,
  image,
}: {
  name: string;
  surname: string;
  role: string;
  link: string;
  image: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="comitee-card-link"
    >
      <div className="comitee-card">
        <DirectusImage
          cover={true}
          img={image}
          name={name}
          className={"comitee-card-image"}
        />
        <div>
          <h3>
            {name} {surname}
          </h3>
          <p>{role}</p>
        </div>
      </div>
    </a>
  );
}
