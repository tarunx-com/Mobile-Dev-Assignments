import React from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Pressable
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useDeviceMotion, DriveEvent } from "@/hooks/use-device-motion";
import useTheme from "@/theme/theme";
import Background from "@/app/components/Background";
import { insert } from "@/db/db";

const pad = (n: number) => String(n).padStart(2, "0");

function fmtDuration(s: number) {
	const h = Math.floor(s / 3600);
	const m = Math.floor((s % 3600) / 60);
	const sec = s % 60;
	return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

function fmtDistance(metres: number) {
	return (metres / 1000).toFixed(3);
}

function fmtTime(ts: number) {
	const d = new Date(ts);
	const h = d.getHours();
	const ampm = h >= 12 ? "PM" : "AM";
	return `${pad(h % 12 || 12)}:${pad(d.getMinutes())} ${ampm}`;
}

const EVENT_ICON: Record<DriveEvent, keyof typeof Ionicons.glyphMap> = {
	"Smooth Driving": "car-sport-outline",
	"Harsh Brake": "warning-outline",
	"Harsh Acceleration": "speedometer-outline",
	"Sharp Turn": "arrow-redo-outline",
	"Phone Handling": "phone-portrait-outline",
};



// ─── Screen ───────────────────────────────────────────────────────────────────
export default function DriveScreen() {
	const router = useRouter();
	const { inUseTheme, isDark } = useTheme();
	const { score, currentEvent, eventLog, distance, duration } =useDeviceMotion();

	const isEvent = currentEvent !== "Smooth Driving";
	const RED = "#ff4d4d";

	const cardBg = isDark ? "rgba(28,27,27,0.82)" : inUseTheme.card;

	const evCardBg = isEvent ? "rgba(180,30,30,0.15)" : cardBg;
	const evCardBorder = isEvent ? "rgba(255,60,60,0.4)" : inUseTheme.border;
	const evTxtCol = isEvent ? RED : inUseTheme.text;
	const dotCol = isEvent ? RED : "#4caf50";

	return (
		<View style={[s.root, { backgroundColor: inUseTheme.backgroundColor }]}>
			<StatusBar style={isDark ? "light" : "dark"} />

			<Background />

			<ScrollView
				contentContainerStyle={s.scroll}
				showsVerticalScrollIndicator={false}
				>

				<View
					style={[
						s.card,
						{
							backgroundColor: cardBg,
							borderColor: inUseTheme.border,
						},
					]}>
					<Text
						style={[s.sectionTitle, { color: inUseTheme.subtext }]}>
						LIVE SAFETY SCORE
					</Text>
					<View style={s.scoreRow}>
						<View style={s.scoreNumRow}>
							<Text
								style={[
									s.scoreNum,
									{ color: inUseTheme.text },
								]}>
								{score}
							</Text>
							<Text
								style={[
									s.scoreMax,
									{ color: inUseTheme.subtext },
								]}>
								{" "}
								/ 100
							</Text>
						</View>
						<View
							style={[
								s.shieldRing,
								{ borderColor: inUseTheme.accent },
							]}>
							<Ionicons
								name="shield-checkmark"
								size={22}
								color={inUseTheme.accent}
							/>
						</View>
					</View>
				</View>

				<View
					style={[
						s.card,
						s.eventCard,
						{
							backgroundColor: evCardBg,
							borderColor: evCardBorder,
						},
					]}>

					<Ionicons name={EVENT_ICON[currentEvent]}
						size={50}
						color={
							isEvent ? RED : inUseTheme.accent
						}/>
					
					<Text
						style={[s.sectionTitle, { color: inUseTheme.subtext }]}>
						LIVE EVENT STATUS
					</Text>
					<Text style={[s.evTxt, { color: evTxtCol }]}>
						{currentEvent}
					</Text>
					<View style={s.monitorRow}>
						<View
							style={[s.monitorDot, { backgroundColor: dotCol }]}
						/>
						<Text
							style={[
								s.monitorTxt,
								{ color: inUseTheme.subtext },
							]}>
							MONITORING ACTIVE
						</Text>
					</View>
				</View>

				<View style={s.statsRow}>
					{[
						{
							label: "DISTANCE",
							value: fmtDistance(distance),
							sub: "KM",
						},
						{
							label: "TIME",
							value: fmtDuration(duration),
							sub: "ELAPSED",
						},
					].map(({ label, value, sub }) => (
						<View
							key={label}
							style={[
								s.statCard,
								{
									backgroundColor: cardBg,
									borderColor: inUseTheme.border,
								},
							]}>
							<Text
								style={[
									s.statLabel,
									{ color: inUseTheme.subtext },
								]}>
								{label}
							</Text>
							<Text
								style={[
									s.statValue,
									{ color: inUseTheme.text },
								]}>
								{value}
							</Text>
							{sub ? (
								<Text
									style={[
										s.statSub,
										{ color: inUseTheme.subtext },
									]}>
									{sub}
								</Text>
							) : null}
						</View>
					))}
				</View>

				<View style={s.sectionRow}>
					<Text
						style={[s.sectionTitle, { color: inUseTheme.subtext }]}>
						EVENT BREAKDOWN
					</Text>
				</View>

				{eventLog.length === 0 ? (
					<View
						style={[
							s.card,
							s.emptyCard,
							{
								backgroundColor: cardBg,
								borderColor: inUseTheme.border,
							},
						]}>
						<Ionicons
							name="checkmark-circle-outline"
							size={22}
							color={inUseTheme.subtext}
						/>
						<Text
							style={[s.emptyTxt, { color: inUseTheme.subtext }]}>
							No events recorded yet
						</Text>
					</View>
				) : (
					[...eventLog].reverse().map((ev, i) => {
						const isHarsh = ev.penalty < 0;
						return (
							<View
								key={i}
								style={[
									s.card,
									s.evItem,
									{
										backgroundColor: isHarsh
											? inUseTheme.accentBg
											: cardBg,
										borderColor: isHarsh
											? inUseTheme.accent
											: inUseTheme.border,
									},
								]}>
								<View
									style={[
										s.evIcon,
										{
											backgroundColor: isHarsh
												? inUseTheme.accentBg
												: isDark
													? "rgba(255,255,255,0.06)"
													: "rgba(0,0,0,0.05)",
										},
									]}>
									<Ionicons
										name={EVENT_ICON[ev.type]}
										size={16}
										color={
											isHarsh ? inUseTheme.accent : inUseTheme.subtext
										}
									/>
								</View>

								<View style={{ flex: 1 }}>
									<Text
										style={[
											s.evName,
											{ color: inUseTheme.text },
										]}>
										{ev.type}
									</Text>
									<Text
										style={[
											s.evTime,
											{ color: inUseTheme.subtext },
										]}>
										{fmtTime(ev.timestamp)}
									</Text>
								</View>

								<Text
									style={[
										s.evPts,
										{ color: isHarsh ? RED : "#4caf50" },
									]}>
									{isHarsh ? `${ev.penalty} pts` : "Stable"}
								</Text>
							</View>
						);
					})
				)}

				<Pressable
					onPress={() => {router.back(),insert(score,distance,duration)}}
					style={({ pressed }) => [
						s.endBtn,
						{ opacity: pressed ? 0.75 : 1 },
					]}>
					<Ionicons
						name="stop-circle-outline"
						size={20}
						color={RED}
					/>
					<Text style={s.endBtnTxt}>End Drive</Text>
				</Pressable>

			</ScrollView>
		</View>
	);
}

const s = StyleSheet.create({
	root: { flex: 1, overflow: "hidden" },
	scroll: { padding: 14, paddingTop: 100, paddingBottom: 48,justifyContent:'center',flexGrow:1 },

	// ── Shared card (mirrors Index exactly) ──
	card: {
		marginBottom: 16,
		borderRadius: 14,
		borderWidth: 1,
		padding: 14,
	},

	// ── Score ──
	sectionTitle: {
		fontSize: 10.5,
		letterSpacing: 1.6,
		fontWeight: "700",
		marginBottom: 12,
	},
	scoreRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	scoreNumRow: { flexDirection: "row", alignItems: "flex-end" },
	scoreNum: { fontSize: 52, fontWeight: "700", lineHeight: 58 },
	scoreMax: { fontSize: 18, fontWeight: "400", marginBottom: 8 },
	shieldRing: {
		width: 50,
		height: 50,
		borderRadius: 25,
		borderWidth: 1.5,
		alignItems: "center",
		justifyContent: "center",
	},

	// ── Event status ──
	eventCard: { alignItems: "center", paddingVertical: 30, gap: 10 },
	evTxt: {
		fontSize: 27,
		fontWeight: "700",
		letterSpacing: 0.3,
		textAlign: "center",
	},
	monitorRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginTop: 2,
	},
	monitorDot: { width: 6, height: 6, borderRadius: 3 },
	monitorTxt: { fontSize: 9, letterSpacing: 2.2, fontWeight: "700" },

	// ── Stats ──
	statsRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
	statCard: {
		flex: 1,
		borderRadius: 14,
		borderWidth: 1,
		paddingVertical: 12,
		alignItems: "center",
	},
	statLabel: {
		fontSize: 8.5,
		letterSpacing: 1.6,
		fontWeight: "700",
		marginBottom: 4,
	},
	statValue: { fontSize: 20, fontWeight: "700" },
	statSub: {
		fontSize: 9,
		letterSpacing: 1.2,
		marginTop: 3,
		fontWeight: "600",
	},

	// ── Section header ──
	sectionRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
		paddingHorizontal: 2,
	},

	// ── Empty state ──
	emptyCard: {
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		paddingVertical: 20,
	},
	emptyTxt: { fontSize: 13 },

	// ── Event items ──
	evItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingVertical: 12,
	},
	evIcon: {
		width: 38,
		height: 38,
		borderRadius: 19,
		alignItems: "center",
		justifyContent: "center",
	},
	evName: { fontSize: 14, fontWeight: "600" },
	evTime: { fontSize: 11, marginTop: 2 },
	evPts: { fontSize: 13, fontWeight: "700" },

	// ── End Drive ──
	endBtn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: "rgba(255,60,60,0.1)",
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "rgba(255,60,60,0.3)",
		paddingVertical: 18,
		marginTop: 4,
		marginBottom: 16,
	},
	endBtnTxt: {
		color: "#ff4d4d",
		fontSize: 16,
		fontWeight: "700",
		letterSpacing: 0.4,
	},

});
