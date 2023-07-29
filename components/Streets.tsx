import { FC, PropsWithChildren } from "react";
import { Citizens } from "./Citizens";

interface IStreetsProps extends PropsWithChildren {
  isIncluded: boolean;
  isCitizenIncluded: boolean;
  values: string[];
  streetCitizen: { [key: string]: Set<{ id: number; name: string }> };
}

export const Streets: FC<IStreetsProps> = ({
  isIncluded,
  values,
  streetCitizen,
  isCitizenIncluded,
}) => {
  return (
    <ul
      style={{
        marginLeft: isIncluded ? "30px" : 0,
      }}
    >
      {values.map((street) => {
        return (
          <li key={street}>
            {isIncluded && (
              <span className="rounded-md bg-gray-700 px-3 py-1 my-1.5 block w-fit">
                {street}
              </span>
            )}
            {streetCitizen[street] && (
              <Citizens
                isIncluded={isCitizenIncluded}
                values={Array.from(streetCitizen[street])}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
