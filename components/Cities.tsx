import { FC } from "react";
import { Districts } from "./Districts";
import { ICity } from "@/types";

interface ICitiesProps {
  isIncluded: boolean;
  isDistrictIncluded: boolean;
  isStreetsIncluded: boolean;
  isCitizensIncluded: boolean;
  values: string[];
  citiesDistricts: { [key: string]: Set<string> };
  districtsStreets: { [key: string]: Set<string> };
  streetCitizen: { [key: string]: Set<{ id: number; name: string }> };
  cities: ICity[];
}

export const Cities: FC<ICitiesProps> = ({
  districtsStreets,
  isCitizensIncluded,
  isDistrictIncluded,
  isIncluded,
  isStreetsIncluded,
  citiesDistricts,
  streetCitizen,
  values,
  cities,
}) => {
  return (
    <ul
      style={{
        marginLeft: isIncluded ? "30px" : "0",
      }}
    >
      {values.map((cityName: string) => {
        let key = cityName + " г.";
        return (
          <li key={cityName} className="group relative w-fit">
            {isIncluded && (
              <>
                <span className="rounded-md block bg-gray-700 px-3 py-1 my-1.5 w-fit">
                  {cityName}
                </span>
                <h2 className="font-bold p-2 group-hover:opacity-100 transition-opacity bg-emerald-200 py-1 text-sm text-black top-[-12.5px] rounded-md absolute right-[-100px] opacity-0 m-4 mx-auto">
                  Население:{" "}
                  {cities.find((city) => city.name == cityName)?.data}
                </h2>
              </>
            )}
            {citiesDistricts[key] && !!citiesDistricts[key].size && (
              <Districts
                districtsStreets={districtsStreets}
                isCitizensIncluded={isCitizensIncluded}
                isIncluded={isDistrictIncluded}
                isStreetsIncluded={isStreetsIncluded}
                streetCitizen={streetCitizen}
                values={Array.from(citiesDistricts[key])}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
