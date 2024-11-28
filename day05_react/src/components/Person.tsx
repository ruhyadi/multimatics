export type PersonProps = {
  name: string;
  address: string;
};

const Person: React.FC<PersonProps> = ({ name, address }) => {
  return (
    <div>
      <p>
        Hi my name is {name}. I'm from {address}
      </p>
    </div>
  );
};

export default Person;
