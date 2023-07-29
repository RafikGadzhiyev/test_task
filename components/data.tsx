"use client";
import { FC, useState, SyntheticEvent } from "react";
import { ICitizen, ICity } from "@/types";
import {
  connectCitizenWithStreet,
  connectCountryWithCities,
  connectDistrictsWithCities,
  connectStreetWithDistrict,
} from "@/utils/construct";
import { Cities } from "./Cities";

interface IDataProps {
  cities: ICity[];
  citizens: ICitizen[];
}

export const Data: FC<IDataProps> = ({ cities, citizens }) => {
  const COUNTRY = "Россия";
  const countryCities = connectCountryWithCities(COUNTRY, cities);
  const citiesDistricts = connectDistrictsWithCities(citizens);
  const districtsStreets = connectStreetWithDistrict(citizens);
  const streetCitizen = connectCitizenWithStreet(citizens);

  const allFields = ["country", "city", "district", "street", "citizen"];

  const [fields, setFields] = useState(["city", "district", "street"]);

  const changeHandler = (
    e: SyntheticEvent<HTMLInputElement>,
    field: string
  ): void => {
    if (!(e.target as HTMLInputElement).checked) {
      setFields((f) => f.filter((item) => item !== field));
      return;
    }
    setFields((f) => [...f, field]);
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-5">
          {allFields.map((field) => (
            <div key={field}>
              <label className="rounded-3xl p-2 bg-slate-600 my-4 flex items-center gap-1 capitalize cursor-pointer transition hover:bg-slate-500 active:bg-slate-700">
                <input
                  type="checkbox"
                  checked={fields.includes(field)}
                  onChange={(e) => changeHandler(e, field)}
                />
                {field}
              </label>
            </div>
          ))}
        </div>
        {fields.includes("country") && (
          <h1 className="text-2xl mt-4 bg-gray-500 w-fit rounded-md px-2">
            {COUNTRY}
          </h1>
        )}
        <Cities
          isIncluded={fields.includes("city")}
          isCitizensIncluded={fields.includes("citizen")}
          isDistrictIncluded={fields.includes("district")}
          isStreetsIncluded={fields.includes("street")}
          citiesDistricts={citiesDistricts}
          districtsStreets={districtsStreets}
          streetCitizen={streetCitizen}
          values={countryCities[COUNTRY]}
          cities={cities}
        />
      </div>
    </>
  );
};

/*
  Изначальная цепочка: 
Город - Район - Улица
Возможные варианты изменений цепочки: 
Страна - Город - Район - Улица - Дом
Город - Улица

*/
