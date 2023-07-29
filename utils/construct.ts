import { ICitizen, ICity, IGroup } from "@/types";

export const connectCountryWithCities = (parent: string, cities: ICity[]) => {
  return {
    [parent]: cities.map((city) => city.name),
  };
};

export const connectDistrictsWithCities = (citizens: ICitizen[]) => {
  const result: { [key: string]: Set<string> } = {};
  for (let citizen of citizens) {
    let city = (citizen.groups.find((group) => group.type === "city") as IGroup)
        .name,
      district = (
        citizen.groups.find((group) => group.type === "district") as IGroup
      ).name;

    if (!result[city]) result[city] = new Set([district]);
    else result[city].add(district);
  }

  return result;
};

export const connectStreetWithDistrict = (citizens: ICitizen[]) => {
  const result: { [key: string]: Set<string> } = {};
  for (let citizen of citizens) {
    let district = (
        citizen.groups.find((group) => group.type === "district") as IGroup
      ).name,
      street = (
        citizen.groups.find((group) => group.type === "street") as IGroup
      ).name;

    if (!result[district]) result[district] = new Set([street]);
    else result[district].add(street);
  }

  return result;
};

export const connectCitizenWithStreet = (citizens: ICitizen[]) => {
  const result: { [key: string]: Set<string> } = {};
  for (let citizen of citizens) {
    let street = (
      citizen.groups.find((group) => group.type === "street") as IGroup
    ).name;

    if (!result[street]) result[street] = new Set([citizen.name]);
    else result[street].add(citizen.name);
  }

  return result;
};

export const Constructor = (cities: ICity[], citizens: ICitizen[]) => {
  return {
    city: connectCountryWithCities("Россия", cities),
    district: connectDistrictsWithCities(citizens),
    street: connectStreetWithDistrict(citizens),
    citizen: connectCitizenWithStreet(citizens),
  };
};
