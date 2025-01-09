import React from "react";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import getPokemons from "@/actions/get-pokemons";

const HomeScreen = () => {
  const router = useRouter();

  const { isLoading, data } = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemons(),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button
          onPress={() => router.navigate("/search")}
          mode="contained"
          style={{ margin: 10 }}
        >
          Press me
        </Button>
      )}

      <Pressable onPress={() => router.navigate("/search")}>
        <Text>Search Screen</Text>
      </Pressable>
      <Pressable onPress={() => router.navigate("/pokemon")}>
        <Text>Pokemon Screen</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
