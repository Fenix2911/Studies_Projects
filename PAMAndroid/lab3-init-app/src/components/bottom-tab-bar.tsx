import Ionicons from "@expo/vector-icons/Ionicons";
import { usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Tab = {
  route: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFocused: keyof typeof Ionicons.glyphMap;
};

const TABS: Tab[] = [
  {
    route: "/",
    label: "Lista zadań",
    icon: "checkbox-outline",
    iconFocused: "checkbox",
  },
  {
    route: "/about",
    label: "O aplikacji",
    icon: "information-circle-outline",
    iconFocused: "information-circle",
  },
];

export default function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const focused = pathname === tab.route;
        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.tab}
            onPress={() => router.replace(tab.route as any)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={focused ? tab.iconFocused : tab.icon}
              size={24}
              color={focused ? "#6C63FF" : "#aaa"}
            />
            <Text style={[styles.label, focused && styles.labelFocused]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E8E8FF",
    paddingBottom: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    gap: 3,
  },
  label: {
    fontSize: 11,
    color: "#aaa",
  },
  labelFocused: {
    color: "#6C63FF",
    fontWeight: "600",
  },
});
