import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import getPokemons from "@/actions/get-pokemons";
import PokeballBg from "@/components/ui/PokeballBg";
import { Text } from "react-native-paper";
import { globalTheme } from "@/config/theme/global-theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PokemonCard from "@/components/pokemons/PokemonCard";

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pokemons", "pokemons-infinite"],
    initialPageParam: 0,
    queryFn: async (params) => {
      const pokemons = await getPokemons(params.pageParam);

      pokemons.forEach((pokemon) => {
        queryClient.setQueryData(["pokemon", pokemon.id], pokemon);
      });
      return pokemons;
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />
      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ marginTop: top + 20 }}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokedex</Text>}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: "absolute",
    top: -100,
    right: -100,
  },
});

export default HomeScreen;
