import pokeApi from "@/config/api/pokeApi";
import type { Pokemon } from "@/domain/entities/pokemon";
import {
  PokeApiPaginatedResponse as PokeApiPaginatedResponse,
  PokeApiPokemon as PokeApiPokemon,
} from "@/infraestructure/interfaces/pokeapi.interface";
import { PokemonMapper } from "@/infraestructure/mappers/pokemon.mapper";

const getPokemons = async (
  page: number,
  limit: number = 20
): Promise<Pokemon[]> => {
  try {
    const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
    const { data } = await pokeApi.get<PokeApiPaginatedResponse>(url);

    const pokemonPromises = data.results.map((info) => {
      return pokeApi.get<PokeApiPokemon>(info.url);
    });

    const pokeApiPokemons = await Promise.all(pokemonPromises);
    const pokemons = pokeApiPokemons.map((pokeApiPokemon) =>
      PokemonMapper.pokeApiPokemonToEntity(pokeApiPokemon.data)
    );
    return pokemons;
  } catch (error) {
    throw new Error("Error getting pokemons");
  }
};

export default getPokemons;
