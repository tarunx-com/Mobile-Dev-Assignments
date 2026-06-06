import { useState, useCallback } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import useTheme from "@/theme/theme";
import Background from "@/app/components/Background";
import { getOne, History } from "@/db/db";
import { Ionicons } from "@expo/vector-icons";

const pad = (n: number) => String(n).padStart(2, "0");

function fmtDuration(s: number) {
  const h   = Math.floor(s / 3600);
  const m   = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

function fmtDistance(metres: number) {
  return `${(metres / 1000).toFixed(3)} km`;
}

function ScoreRing({
  score,
  accent,
  textColor,
  subtextColor,
}: {
  score: number;
  accent: string;
  textColor: string;
  subtextColor: string;
}) {
  const SIZE   = 180;
  const STROKE = 10;
  const GLOW   = STROKE + 10;
  const R      = (SIZE - GLOW) / 2;
  const C      = 2 * Math.PI * R;
  const offset = C * (1 - score / 100);
  const cx     = SIZE / 2;
  const cy     = SIZE / 2;
  const rot    = `rotate(-90, ${cx}, ${cy})`;

  return (
    <Svg width={SIZE} height={SIZE}>
      <Circle cx={cx} cy={cy} r={R} stroke={subtextColor} strokeOpacity={0.15} strokeWidth={STROKE} fill="transparent" />
      <Circle cx={cx} cy={cy} r={R} stroke={accent} strokeWidth={GLOW} fill="transparent" strokeDasharray={C} strokeDashoffset={offset} strokeLinecap="round" transform={rot} strokeOpacity={0.2} />
      <Circle cx={cx} cy={cy} r={R} stroke={accent} strokeWidth={STROKE} fill="transparent" strokeDasharray={C} strokeDashoffset={offset} strokeLinecap="round" transform={rot} />
      <SvgText x={cx} y={cy - 16} textAnchor="middle" fontSize={9} fontWeight="700" fill={subtextColor} letterSpacing={2.5}>
        LAST RIDE SCORE
      </SvgText>
      <SvgText x={cx} y={cy + 30} textAnchor="middle" fontSize={50} fontWeight="700" fill={textColor}>
        {score}
      </SvgText>
    </Svg>
  );
}

export default function Index() {
  const router = useRouter();
  const { inUseTheme, isDark } = useTheme();

  const [lastRide, setLastRide] = useState<History | null>(null);

  useFocusEffect(
      useCallback(() => {
          getOne().then((rows) => {
              setLastRide(rows[0] ?? null);
          });
      }, [])
  );

  return (
    <View style={[styles.root, { backgroundColor: inUseTheme.backgroundColor }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <Background />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {lastRide && (
          <View style={styles.scoreSection}>
            <ScoreRing
              score={lastRide.score}
              accent={inUseTheme.accent}
              textColor={inUseTheme.text}
              subtextColor={inUseTheme.subtext}
            />
          </View>
        )}

        {lastRide && (
          <View
            style={[
              styles.card,
              {
                backgroundColor: isDark ? "rgba(28,27,27,0.82)" : inUseTheme.card,
                borderColor: inUseTheme.border,
              },
            ]}
          >
            <View style={styles.cardTopRow}>
              <Text style={[styles.sectionTitle, { color: inUseTheme.subtext }]}>LAST TRIP</Text>
            </View>
            <View style={styles.tripRow}>
              <View>
                <Text style={[styles.metricBig, { color: inUseTheme.text }]}>
                  {fmtDistance(lastRide.distance)}
                </Text>
                <Text style={[styles.metricSub, { color: inUseTheme.subtext }]}>Distance</Text>
              </View>
              <View style={[styles.vDivider, { backgroundColor: inUseTheme.border }]} />
              <View>
                <Text style={[styles.metricBig, { color: inUseTheme.text }]}>
                  {fmtDuration(lastRide.duration)}
                </Text>
                <Text style={[styles.metricSub, { color: inUseTheme.subtext }]}>Duration</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.startArea}>
          <Pressable
            onPress={() => router.navigate("/(app)/DriveScreen")}
            style={({ pressed }) => [
              styles.startBtn,
              {
                backgroundColor: isDark ? "#e4e4e4" : "#ffffff",
                shadowColor: inUseTheme.accent,
                transform: [{ scale: pressed ? 0.93 : 1 }],
              },
            ]}
          >
            <Ionicons name='play' size={16} color='#1a1a1a'/>
            <Text style={styles.startLabelTxt}>START DRIVE</Text>
          </Pressable>
        </View>

        <Text style={[styles.footerNote, { color: inUseTheme.subtext }]}>
          Drive Safely, a loved one is waiting for your return.
        </Text>
      </ScrollView>
    </View>
  );
}

// ─── Styles (unchanged) ───────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: "hidden",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 32,
  },

  scoreSection: {
    alignItems: "center",
    marginBottom: 28,
  },

  card: {
    marginHorizontal: 16,
    marginVertical: 16,
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
  sectionTitle: {
    fontSize: 10.5,
    letterSpacing: 1.6,
    fontWeight: "700",
  },
  tripRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  metricBig: {
    fontSize: 21,
    fontWeight: "700",
  },
  metricSub: {
    fontSize: 12,
    marginTop: 1,
  },
  vDivider: {
    width: 1,
    height: 36,
  },

  startArea: {
    alignItems: "center",
    paddingVertical: 28,
  },
  startBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 22,
    elevation: 14,
  },
  startLabelTxt: {
    paddingTop:2,
    fontSize: 9,
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: 1.8,
  },

  footerNote: {
    textAlign: "center",
    fontSize: 11.5,
    marginHorizontal: 30,
    marginTop: 8,
    letterSpacing: 0.2,
    fontStyle: "italic",
  },
});