"use client";
import { FC, useState, SyntheticEvent } from "react";
import { ICitizen, ICity } from "@/types";
import { Constructor, connectCitizenWithStreet } from "@/utils/construct";
import { List } from "./List";

interface IDataProps {
  cities: ICity[];
  citizens: ICitizen[];
}

export const Data: FC<IDataProps> = ({ cities, citizens }) => {
  const COUNTRY = "Россия";
  const constructedData = Constructor(cities, citizens);

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
        <div className="flex items-center gap-5 sticky top-0 bg-[rgb(0_0_0)] bg-opacity-50 backdrop-blur-sm z-[10000]">
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
        <List
          isIncluded={fields.includes("city")}
          listKey="city"
          values={constructedData.city[COUNTRY]}
          fields={fields}
          constructedData={constructedData}
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
