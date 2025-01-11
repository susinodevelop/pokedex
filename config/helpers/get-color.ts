import ImageColors from "react-native-image-colors";

export const getColorFromImage = async (imageUrl: string): Promise<string> => {
  try {
    const fallbackColor = "#fff";

    const colors = await ImageColors.getColors(imageUrl, {
      fallback: fallbackColor,
    });

    if (colors.platform === "android") {
      return colors.dominant ?? fallbackColor;
    } else if (colors.platform === "ios") {
      return colors.background ?? fallbackColor;
    } else {
      return fallbackColor;
    }
  } catch (error) {
    console.error("Error al obtener los colores:", error);
    return "grey";
  }
};
