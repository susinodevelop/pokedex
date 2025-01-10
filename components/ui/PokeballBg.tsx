import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";
import { Image, ImageStyle, StyleProp, View } from "react-native";

interface PokeballBgProps {
  style?: StyleProp<ImageStyle>;
}
const PokeballBg = ({ style }: PokeballBgProps) => {
  const { isDark } = useContext(ThemeContext);

  const pokeballImg = isDark
    ? require("@/assets/images/pokeball/pokeball-dark.png")
    : require("@/assets/images/pokeball/pokeball-light.png");

  return (
    <View style={{}}>
      <Image
        source={pokeballImg}
        style={[
          {
            width: 300,
            height: 300,
            opacity: 0.3,
          },
          style,
        ]}
      />
    </View>
  );
};

export default PokeballBg;
