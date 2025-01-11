import pokeApi from "@/config/api/pokeApi";
import { PokeApiPokemon } from "@/infraestructure/interfaces/pokeapi.interface";
import { PokemonMapper } from "@/infraestructure/mappers/pokemon.mapper";

const getPokemonById = async (id: number) => {
  try {
    const { data } = await pokeApi.get<PokeApiPokemon>(`/pokemon/${id}`);
    const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data);
    return pokemon;
  } catch (error) {
    throw new Error(`Error getting pokemon by id: ${id}`);
  }
};

export default getPokemonById;
