// Material Theme에서 정의하는 Text Styles입니다.
type FontSemantic = "display" | "headline" | "body" | "label" | "title";
type FontSize = "large" | "medium" | "small";
type FontWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type MaterialThemeTextStyles = {
  [semantic in FontSemantic]: {
    [size in FontSize]: {
      fontSize: number;
      lineHeight: number;
      fontWeight: FontWeight;
      letterSpacing: number;
    };
  };
};

export const text: MaterialThemeTextStyles = {
  display: {
    large: {
      fontSize: 57,
      lineHeight: 64,
      fontWeight: "bold",
      letterSpacing: -0.25,
    },
    medium: {
      fontSize: 45,
      lineHeight: 52,
      fontWeight: "normal",
      letterSpacing: 0,
    },
    small: {
      fontSize: 36,
      lineHeight: 44,
      fontWeight: "normal",
      letterSpacing: 0,
    },
  },
  headline: {
    large: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: "bold",
      letterSpacing: 0,
    },
    medium: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: "bold",
      letterSpacing: 0,
    },
    small: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: "bold",
      letterSpacing: 0,
    },
  },
  body: {
    large: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "normal",
      letterSpacing: 0.5,
    },
    medium: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "normal",
      letterSpacing: 0.25,
    },
    small: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "normal",
      letterSpacing: 0.4,
    },
  },
  label: {
    large: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "semibold",
      letterSpacing: 0.1,
    },
    medium: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "medium",
      letterSpacing: 0.5,
    },
    small: {
      fontSize: 11,
      lineHeight: 16,
      fontWeight: "medium",
      letterSpacing: 0.5,
    },
  },
  title: {
    large: {
      fontSize: 22,
      lineHeight: 28,
      fontWeight: "bold",
      letterSpacing: 0,
    },
    medium: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "medium",
      letterSpacing: 0.15,
    },
    small: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "medium",
      letterSpacing: 0.1,
    },
  },
};

// Material Theme에서 정의하는 Color Styles입니다.
type ColorTheme = "light" | "dark";

export type MaterialThemeColorStyles = {
  [theme in ColorTheme]: {
    // 각 색상은 Hex Code로 삽입된다.
    [semanticColor: string]: `#${string}`;
  };
};

export const color: MaterialThemeColorStyles = {
  light: {
    primary: "#555A92",
    surfaceTint: "#555A92",
    onPrimary: "#FFFFFF",
    primaryContainer: "#E0E0FF",
    onPrimaryContainer: "#10144B",
    secondary: "#5C5D72",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#E1E0F9",
    onSecondaryContainer: "#191A2C",
    tertiary: "#78536B",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#FFD8EE",
    onTertiaryContainer: "#2E1126",
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",
    background: "#FBF8FF",
    onBackground: "#1B1B21",
    surface: "#FBF8FF",
    onSurface: "#1B1B21",
    surfaceVariant: "#E3E1EC",
    onSurfaceVariant: "#46464F",
    outline: "#777680",
    outlineVariant: "#C7C5D0",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#303036",
    inverseOnSurface: "#F2EFF7",
    inversePrimary: "#BEC2FF",
    primaryFixed: "#E0E0FF",
    onPrimaryFixed: "#10144B",
    primaryFixedDim: "#BEC2FF",
    onPrimaryFixedVariant: "#3D4279",
    secondaryFixed: "#E1E0F9",
    onSecondaryFixed: "#191A2C",
    secondaryFixedDim: "#C5C4DD",
    onSecondaryFixedVariant: "#444559",
    tertiaryFixed: "#FFD8EE",
    onTertiaryFixed: "#2E1126",
    tertiaryFixedDim: "#E7B9D5",
    onTertiaryFixedVariant: "#5E3C53",
    surfaceDim: "#DBD9E0",
    surfaceBright: "#FBF8FF",
    surfaceContainerLowest: "#FFFFFF",
    surfaceContainerLow: "#F5F2FA",
    surfaceContainer: "#EFEDF4",
    surfaceContainerHigh: "#EAE7EF",
    surfaceContainerHighest: "#E4E1E9",
  },
  dark: {
    primary: "#BEC2FF",
    surfaceTint: "#BEC2FF",
    onPrimary: "#262B60",
    primaryContainer: "#3D4279",
    onPrimaryContainer: "#E0E0FF",
    secondary: "#C5C4DD",
    onSecondary: "#2E2F42",
    secondaryContainer: "#444559",
    onSecondaryContainer: "#E1E0F9",
    tertiary: "#E7B9D5",
    onTertiary: "#45263C",
    tertiaryContainer: "#5E3C53",
    onTertiaryContainer: "#FFD8EE",
    error: "#FFB4AB",
    onError: "#690005",
    errorContainer: "#93000A",
    onErrorContainer: "#FFDAD6",
    background: "#131318",
    onBackground: "#E4E1E9",
    surface: "#131318",
    onSurface: "#E4E1E9",
    surfaceVariant: "#46464F",
    onSurfaceVariant: "#C7C5D0",
    outline: "#91909A",
    outlineVariant: "#46464F",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#E4E1E9",
    inverseOnSurface: "#303036",
    inversePrimary: "#555A92",
    primaryFixed: "#E0E0FF",
    onPrimaryFixed: "#10144B",
    primaryFixedDim: "#BEC2FF",
    onPrimaryFixedVariant: "#3D4279",
    secondaryFixed: "#E1E0F9",
    onSecondaryFixed: "#191A2C",
    secondaryFixedDim: "#C5C4DD",
    onSecondaryFixedVariant: "#444559",
    tertiaryFixed: "#FFD8EE",
    onTertiaryFixed: "#2E1126",
    tertiaryFixedDim: "#E7B9D5",
    onTertiaryFixedVariant: "#5E3C53",
    surfaceDim: "#131318",
    surfaceBright: "#39393F",
    surfaceContainerLowest: "#0E0E13",
    surfaceContainerLow: "#1B1B21",
    surfaceContainer: "#1F1F25",
    surfaceContainerHigh: "#2A292F",
    surfaceContainerHighest: "#34343A",
  },
};
