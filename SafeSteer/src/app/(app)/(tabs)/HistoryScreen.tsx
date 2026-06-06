import { useCallback, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
	useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "expo-router";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import useTheme from "@/theme/theme";
import Background from "@/app/components/Background";
import { getAll, History } from "@/db/db"; 

const pad = (n: number) => String(n).padStart(2, "0");

function fmtDuration(s: number) {
	const h = Math.floor(s / 3600);
	const m = Math.floor((s % 3600) / 60);
	const sec = s % 60;
	return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

function fmtDistance(metres: number) {
	return `${(metres / 1000).toFixed(3)} km`;
}

function fmtDate(dateStr: string) {
	// SQLite datetime('now') → "2024-01-15 14:30:00" (UTC)
	const d = new Date(dateStr.replace(" ", "T") + "Z");
	return d.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

function scoreColor(score: number, accent: string): string {
	if (score < 50) return "#ff4d4d";
	if (score <= 80) return "#f5c518";
	return accent;
}

function ScoreRing({
	score,
	accent,
	textColor,
	subtextColor,
	label = "LIFETIME SCORE",
}: {
	score: number;
	accent: string;
	textColor: string;
	subtextColor: string;
	label?: string;
}) {
	const SIZE = 180;
	const STROKE = 10;
	const GLOW = STROKE + 10;
	const R = (SIZE - GLOW) / 2;
	const C = 2 * Math.PI * R;
	const offset = C * (1 - Math.max(0, Math.min(score, 100)) / 100);
	const cx = SIZE / 2;
	const cy = SIZE / 2;
	const rot = `rotate(-90, ${cx}, ${cy})`;

	return (
		<Svg width={SIZE} height={SIZE}>
			{/* Track */}
			<Circle
				cx={cx}
				cy={cy}
				r={R}
				stroke={subtextColor}
				strokeOpacity={0.15}
				strokeWidth={STROKE}
				fill="transparent"
			/>
			{/* Glow */}
			<Circle
				cx={cx}
				cy={cy}
				r={R}
				stroke={accent}
				strokeWidth={GLOW}
				fill="transparent"
				strokeDasharray={C}
				strokeDashoffset={offset}
				strokeLinecap="round"
				transform={rot}
				strokeOpacity={0.2}
			/>
			{/* Arc */}
			<Circle
				cx={cx}
				cy={cy}
				r={R}
				stroke={accent}
				strokeWidth={STROKE}
				fill="transparent"
				strokeDasharray={C}
				strokeDashoffset={offset}
				strokeLinecap="round"
				transform={rot}
			/>
			{/* Label */}
			<SvgText
				x={cx}
				y={cy - 16}
				textAnchor="middle"
				fontSize={9}
				fontWeight="700"
				fill={subtextColor}
				letterSpacing={2.5}
				>
				{label}
			</SvgText>
			{/* Number */}
			<SvgText
				x={cx}
				y={cy + 30}
				textAnchor="middle"
				fontSize={50}
				fontWeight="700"
				fill={textColor}>
				{score}
			</SvgText>
		</Svg>
	);
}

function HistoryCard({
	item,
	isDark,
	inUseTheme,
}: {
	item: History;
	isDark: boolean;
	inUseTheme: any;
}) {
	const color = scoreColor(item.score, inUseTheme.accent);
	const cardBg = isDark ? "rgba(28,27,27,0.82)" : inUseTheme.card;

	return (
		<View
			style={[
				styles.card,
				{ backgroundColor: cardBg, borderColor: inUseTheme.border },
			]}>
			<View style={styles.cardTopRow}>
				<Text
					style={[
						styles.sectionTitle,
						{ color: inUseTheme.subtext },
					]}>
					TRIP
				</Text>
				<Text style={[styles.dateText, { color: inUseTheme.subtext }]}>
					{fmtDate(item.date)}
				</Text>
			</View>

			<View style={styles.tripRow}>
				<View style={styles.metricCol}>
					<Text style={[styles.metricBig, { color }]}>
						{item.score}
					</Text>
					<Text
						style={[
							styles.metricSub,
							{ color: inUseTheme.subtext },
						]}>
						Score
					</Text>
				</View>

				<View
					style={[
						styles.vDivider,
						{ backgroundColor: inUseTheme.border },
					]}
				/>

				<View style={styles.metricCol}>
					<Text
						style={[styles.metricBig, { color: inUseTheme.text }]}>
						{fmtDistance(item.distance)}
					</Text>
					<Text
						style={[
							styles.metricSub,
							{ color: inUseTheme.subtext },
						]}>
						Distance
					</Text>
				</View>

				<View
					style={[
						styles.vDivider,
						{ backgroundColor: inUseTheme.border },
					]}
				/>

				<View style={styles.metricCol}>
					<Text
						style={[styles.metricBig, { color: inUseTheme.text }]}>
						{fmtDuration(item.duration)}
					</Text>
					<Text
						style={[
							styles.metricSub,
							{ color: inUseTheme.subtext },
						]}>
						Duration
					</Text>
				</View>
			</View>
		</View>
	);
}

export default function HistoryScreen() {
	const { inUseTheme, isDark } = useTheme();
	const [history, setHistory] = useState<History[]>([]);
	const [loading, setLoading] = useState(true);
	const {height,width} = useWindowDimensions();

	const isLandscape=width>height;

	useFocusEffect(
		useCallback(() => {
			(async () => {
				const rows = await getAll();
				setHistory(rows);
				setLoading(false);
			})();
		}, [])
	);

	const lifetimeScore =
		history.length > 0
			? Math.round(
					history.reduce((sum, h) => sum + h.score, 0) /
						history.length,
				)
			: 0;

	const ringAccent = scoreColor(lifetimeScore, inUseTheme.accent);
	const cardBg = isDark ? "rgba(28,27,27,0.82)" : inUseTheme.card;

	if(isLandscape){
		return (
		<View
			style={[
				styles.root,
				{ backgroundColor: inUseTheme.backgroundColor },
			]}>
			<StatusBar style={isDark ? "light" : "dark"} />
			<Background />

			<ScrollView
				contentContainerStyle={[styles.scrollContent,{paddingTop:100}]}
				showsVerticalScrollIndicator={false}>

				<View style={styles.scoreSection}>
					<ScoreRing
						score={lifetimeScore}
						accent={ringAccent}
						textColor={inUseTheme.text}
						subtextColor={inUseTheme.subtext}
					/>
				</View>

				<View style={styles.sectionRow}>
					<Text
						style={[styles.sectionTitle, { color: inUseTheme.subtext }]}>
						RECENTS
					</Text>
					<View style={{
						borderColor: inUseTheme.subtext,
						borderWidth:0.3,
						marginBottom:4,
						width:'30%'
					}}/>
				</View>

				{loading ? (
					<ActivityIndicator
						style={{ marginTop: 20 }}
						color={inUseTheme.accent}
					/>
				) : history.length === 0 ? (
					<View
						style={[
							styles.card,
							styles.emptyCard,
							{
								backgroundColor: cardBg,
								borderColor: inUseTheme.border,
							},
						]}>
						<Text
							style={[
								styles.emptyText,
								{ color: inUseTheme.subtext },
							]}>
							No trips recorded yet.{"\n"}Start your first drive!
						</Text>
					</View>
				) : (
					history.map((item) => (
						<HistoryCard
							key={item.id}
							item={item}
							isDark={isDark}
							inUseTheme={inUseTheme}
						/>
					))
				)}
			</ScrollView>
		</View>
		);	
	}

	return (
		<View
			style={[
				styles.root,
				{ backgroundColor: inUseTheme.backgroundColor },
			]}>
			<StatusBar style={isDark ? "light" : "dark"} />
			<Background />

			<View
				style={[styles.scrollContent,{paddingTop: 100}]}>

				<View style={styles.scoreSection}>
					<ScoreRing
						score={lifetimeScore}
						accent={ringAccent}
						textColor={inUseTheme.text}
						subtextColor={inUseTheme.subtext}
					/>
				</View>

				<View style={styles.sectionRow}>
					<Text
						style={[styles.sectionTitle, { color: inUseTheme.subtext }]}>
						RECENTS
					</Text>
					<View style={{
						borderColor: inUseTheme.subtext,
						borderWidth:0.3,
						marginBottom:4,
						width:'30%'
					}}/>
				</View>

				<ScrollView
				contentContainerStyle={[styles.scrollContent,{paddingBottom:100}]}
				showsVerticalScrollIndicator={false}>

				{loading ? (
					<ActivityIndicator
						style={{ marginTop: 20 }}
						color={inUseTheme.accent}
					/>
				) : history.length === 0 ? (
					<View
						style={[
							styles.card,
							styles.emptyCard,
							{
								backgroundColor: cardBg,
								borderColor: inUseTheme.border,
							},
						]}>
						<Text
							style={[
								styles.emptyText,
								{ color: inUseTheme.subtext },
							]}>
							No trips recorded yet.{"\n"}Start your first drive!
						</Text>
					</View>
				) : (
					history.map((item) => (
						<HistoryCard
							key={item.id}
							item={item}
							isDark={isDark}
							inUseTheme={inUseTheme}
						/>
					))
				)}
			</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: { flex: 1, overflow: "hidden" },

	scrollContent: {
		paddingBottom: 40,
		flexGrow:1,
		justifyContent:'center'
	},

	// ── Score ring ──
	scoreSection: {
		alignItems: "center",
		marginBottom: 28,
	},

	sectionRow: {
		flexDirection: "row",
		// justifyContent: "center",
		alignItems: "center",
		marginBottom: 4,
		paddingHorizontal: 16,
	},

	sectionTitle: {
		fontSize: 10.5,
		letterSpacing: 1.6,
		fontWeight: "700",
		marginBottom: 6,
		paddingRight:16,
	},

	// ── Card — identical tokens to Index ──
	card: {
		marginHorizontal: 16,
		marginBottom: 12,
		borderRadius: 14,
		borderWidth: 1,
		padding: 14,
	},

	cardTopRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},

	dateText: {
		fontSize: 11,
		fontWeight: "500",
		letterSpacing: 0.3,
	},

	// ── Metrics row ──
	tripRow: {
		flexDirection: "row",
		alignItems: "center",
	},

	metricCol: {
		flex: 1,
	},

	metricBig: {
		fontSize: 20,
		fontWeight: "700",
	},

	metricSub: {
		fontSize: 12,
		marginTop: 1,
	},

	vDivider: {
		width: 1,
		height: 36,
		marginHorizontal: 14,
	},

	// ── Empty state ──
	emptyCard: {
		alignItems: "center",
		paddingVertical: 28,
	},

	emptyText: {
		fontSize: 14,
		textAlign: "center",
		lineHeight: 22,
	},
});
