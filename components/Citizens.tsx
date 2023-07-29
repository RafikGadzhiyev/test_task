import { FC } from "react";

interface ICitizensProps {
  isIncluded: boolean;
  values: { id: number; name: string }[];
}

export const Citizens: FC<ICitizensProps> = ({ isIncluded, values }) => {
  return (
    <ul
      style={{
        marginLeft: isIncluded ? "30px" : 0,
      }}
    >
      {values.map((citizen) => {
        return (
          <li key={citizen.id}>
            {isIncluded && (
              <span className="rounded-md block bg-gray-500 px-3 py-1 my-1.5 w-fit">
                {citizen.name}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};
