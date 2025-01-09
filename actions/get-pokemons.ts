import Pokemon from "@/domain/entities/pokemon";
import axios from "axios";

const getPokemons = async (): Promise<Pokemon[]> => {
  try {
    const url = "/pokemon";
    const { data } = await axios.get(url);
    console.log(data);
    return [];
  } catch (error) {
    throw new Error("Error getting pokemons");
  }
};

export default getPokemons;
