import { FC } from "react";
import { Streets } from "./Streets";

interface IDistrictsProps {
  isIncluded: boolean;
  isStreetsIncluded: boolean;
  isCitizensIncluded: boolean;
  values: string[];
  districtsStreets: { [key: string]: Set<string> };
  streetCitizen: { [key: string]: Set<{ id: number; name: string }> };
}

export const Districts: FC<IDistrictsProps> = ({
  isIncluded,
  isCitizensIncluded,
  isStreetsIncluded,
  values,
  districtsStreets,
  streetCitizen,
}) => {
  return (
    <ul
      style={{
        marginLeft: isIncluded ? "30px" : 0,
      }}
    >
      {values.map((district) => {
        return (
          <li key={district}>
            {isIncluded && (
              <span className="rounded-md block bg-gray-500 px-3 py-1 my-1.5 w-fit">
                {district}
              </span>
            )}
            {districtsStreets[district] && (
              <Streets
                isIncluded={isStreetsIncluded}
                values={Array.from(districtsStreets[district])}
                streetCitizen={streetCitizen}
                isCitizenIncluded={isCitizensIncluded}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
