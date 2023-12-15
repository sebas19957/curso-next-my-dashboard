import { Pokemon } from "@/app/pokemons/interfaces/pokemon";
import { PokemonsResponse } from "@/app/pokemons/interfaces/pokemos-response";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: { name: string };
}

export async function generateStaticParams() {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=151`
  ).then((res) => res.json());

  const staticPokemons = data.results.map((pokemon) => ({
    name: pokemon.name,
  }));

  return staticPokemons;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { name } = await getPokemon(params.name);

    return {
      title: `Pokémon | ${name}`,
      description: `Página del pokémon ${name}`,
    };
  } catch (error) {
    return {
      title: "Página de pokémon",
      description: "Página un pokémon",
    };
  }
}

const getPokemon = async (name: string): Promise<Pokemon> => {
  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      // cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 30 * 2, //Se revalida cada 2 meses
      },
    }).then((res) => res.json());

    return pokemon;
  } catch (error) {
    notFound();
  }
};

const PokemonNamePage = async ({ params }: Props) => {
  const pokemon = await getPokemon(params.name);

  return (
    <div className="flex pt-20 mt-5 flex-col items-center text-slate-800">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="flex items-center absolute rounded-full py-4 px-4  -top-24">
          <Image
            src={pokemon.sprites.other?.dream_world.front_default ?? ""}
            width={150}
            height={150}
            alt={`Imagen del pokemon ${pokemon.name}`}
            className="mb-5"
            style={{
              width: 200,
              height: 200,
            }}
          />
        </div>
        <div className="pt-24 mt-2 mb-8 w-full">
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{pokemon.id} {pokemon.name}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-wrap">
              {pokemon.moves.map((move) => (
                <p key={move.move.name} className="mr-2 capitalize">
                  {move.move.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full mb-4">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Types</p>
            <div className="text-base font-medium text-navy-700 flex">
              {pokemon.types.map((type) => (
                <p key={type.slot} className="mr-2 capitalize">
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Peso</p>
            <span className="text-base font-medium text-navy-700 flex">
              {pokemon.weight}
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Regular Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Shiny Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemon.sprites.front_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonNamePage;
