import PokenonGrid from "@/app/pokemons/components/PokenonGrid";
import { PokemonsResponse } from "@/app/pokemons/interfaces/pokemos-response";
import { SimplePokemon } from "@/app/pokemons/interfaces/simple-pokemon";
import { Metadata } from "next";

export const metadata = {
  title: "Pokémons",
  description: "Página con la lista de pokémones",
};

const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((res) => res.json());

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split("/").at(-2)!,
    name: pokemon.name,
  }));

  return pokemons;
};

const PokemonsPage = async () => {
  const pokemons = await getPokemons(150, 0);

  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2 mb-14">Listado de pokémons estático</span>

      <PokenonGrid pokemons={pokemons} />
    </div>
  );
};

export default PokemonsPage;
