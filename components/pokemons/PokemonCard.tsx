import React from "react";
import { Pokemon } from "@/domain/entities/pokemon";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { FadeInImage } from "../ui/FadeInImage";
import { useRouter } from "expo-router";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const router = useRouter();

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() =>
        router.push({
          pathname: "/pokemon/[id]", // Ruta dinámica
          params: { id: pokemon.id }, // Parámetro dinámico
        })
      }
    >
      <Card style={[styles.cardContainer, { backgroundColor: pokemon.color }]}>
        <Text style={styles.name} variant="bodyLarge" lineBreakMode="middle">
          {pokemon.name}
          {"\n#" + pokemon.id}
        </Text>

        <View style={styles.pokeballContainer}>
          <Image
            source={require("@/assets/images/pokeball/pokeball-light.png")}
            style={styles.pokeball}
          />
        </View>

        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
        <Text style={[styles.name, { marginTop: 35 }]}>{pokemon.types[0]}</Text>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: "grey",
    height: 120,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    color: "white",
    top: 10,
    left: 10,
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: "absolute",
    right: -15,
    top: -30,
  },

  pokeballContainer: {
    alignItems: "flex-end",
    width: "100%",
    position: "absolute",
    overflow: "hidden",
    opacity: 0.5,
  },
});

export default PokemonCard;
