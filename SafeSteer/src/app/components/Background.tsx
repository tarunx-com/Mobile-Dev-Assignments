import { View, StyleSheet } from "react-native";
import { useMemo } from "react";
import useTheme from "@/theme/theme";

const generateStars = (n: number) =>
	Array.from({ length: n }, (_, i) => ({
		id: i,
		left: `${Math.floor(Math.random() * 96) + 2}%`,
		top: `${Math.floor(Math.random() * 94) + 2}%`,
		size: Math.random() * 2.4 + 0.5,
		opacity: Math.random() * 0.6 + 0.2,
	}));

export default function Background() {
	const { isDark } = useTheme();
	const stars = useMemo(() => generateStars(60), []);

	const [ar, ag, ab] = isDark ? [173, 198, 255] : [79, 124, 255];
	const a = (alpha: number) => `rgba(${ar},${ag},${ab},${alpha})`;

	return (
		<View style={StyleSheet.absoluteFill} pointerEvents="none">
			{isDark ? (
				stars.map((s) => (
					<View
						key={s.id}
						style={{
							position: "absolute",
							left: s.left as any,
							top: s.top as any,
							width: s.size,
							height: s.size,
							borderRadius: s.size,
							backgroundColor: "#ffffff",
							opacity: s.opacity,
						}}
					/>
				))
			) : (
				<>
					<View
						style={[
							styles.blob,
							{
								width: 340,
								height: 340,
								borderRadius: 170,
								top: -120,
								right: -110,
								backgroundColor: a(0.09),
							},
						]}
					/>
					<View
						style={[
							styles.blob,
							{
								width: 260,
								height: 260,
								borderRadius: 130,
								bottom: 60,
								left: -90,
								backgroundColor: a(0.07),
							},
						]}
					/>
					<View
						style={[
							styles.blob,
							{
								width: 200,
								height: 200,
								borderRadius: 100,
								top: "38%",
								left: "50%",
								marginLeft: -100,
								backgroundColor: a(0.04),
							},
						]}
					/>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	blob: {
		position: "absolute",
	},
});
