import { Data } from "@/components/data";
import { ICitizen, ICity } from "@/types";

export default async function Home() {
  const cities: ICity[] = (await import("./../data/cities.json")).default;
  const citizens: ICitizen[] = (await import("./../data/citizens.json"))
    .default;

  return (
    <main className="">
      <Data cities={cities} citizens={citizens} />
    </main>
  );
}
