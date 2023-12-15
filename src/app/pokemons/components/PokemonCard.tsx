import Image from "next/image";
import { SimplePokemon } from "../interfaces/simple-pokemon";
import Link from "next/link";

interface Props {
  pokemon: SimplePokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  const { id, name } = pokemon;

  return (
    <div className="flex items-center justify-center">
      <div className="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl flex items-center justify-center">
        <div className=" text-white flex items-center absolute rounded-full py-4 px-4  -top-16">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
            width={80}
            height={80}
            alt={`pokemon_${id}`}
            style={{ width: 100, height: 100 }}
            priority={false}
          />
        </div>
        <div className="mt-6">
          <p className="mb-6 text-xl font-semibold my-2 text-center capitalize">
            {name}
          </p>

          <Link
            href={`/dashboard/pokemons/${name}`}
            className=" h-10 bg-blue-300 p-2 rounded-xl hover:bg-blue-500 transition-colors duration-50 hover:animate-pulse ease-out text-white font-semibold"
          >
            Más información
          </Link>

          <div className="mt-4 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-heart text-red-500 cursor-pointer"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
