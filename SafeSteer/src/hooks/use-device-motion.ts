import { useState, useEffect, useRef } from "react";
import { DeviceMotion } from "expo-sensors";


const THRESHOLDS = {
	harshBrake: 6, 
	harshAcceleration: 5, 
	sharpTurn: 4.2, 
	phoneHandling: 180, 
} as const;

const PENALTIES = {
	harshBrake: -2,
	harshAcceleration: -2,
	sharpTurn: -1,
	phoneHandling: -3,
} as const;

const COOLDOWN_MS = 2500; 
const SMOOTH_RESET_MS = 2000; 
const UPDATE_INTERVAL = 200;
const STATIONARY_THRESHOLD = 0.5; 

// ─── Types ────────────────────────────────────────────────────────────────────
export type DriveEvent =
	| "Smooth Driving"
	| "Harsh Brake"
	| "Harsh Acceleration"
	| "Sharp Turn"
	| "Phone Handling";

export type DriveEventLog = {
	type: DriveEvent;
	timestamp: number; 
	penalty: number;
};

export type UseDeviceMotionReturn = {
	available: boolean | null;
	score: number;
	currentEvent: DriveEvent;
	eventLog: DriveEventLog[];
	distance: number; 
	duration: number; 
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useDeviceMotion(): UseDeviceMotionReturn {
	const [available, setAvailable] = useState<boolean | null>(null);
	const [score, setScore] = useState(100);
	const [currentEvent, setCurrentEvent] =
		useState<DriveEvent>("Smooth Driving");
	const [eventLog, setEventLog] = useState<DriveEventLog[]>([]);
	const [distance, setDistance] = useState(0);
	const [duration, setDuration] = useState(0);

	const cooldownRef = useRef<Partial<Record<DriveEvent, number>>>({});
	const velocityRef = useRef({ x: 0, y: 0, z: 0 });
	const lastTsRef = useRef<number | null>(null);
	const startRef = useRef(Date.now());
	const smoothResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		let subscription: { remove: () => void } | undefined;
		startRef.current = Date.now();

		const durationTick = setInterval(() => {
			setDuration(Math.floor((Date.now() - startRef.current) / 1000));
		}, 1000);

		function applyPenalty(
			type: Exclude<DriveEvent, "Smooth Driving">,
			penalty: number,
		) {
			const now = Date.now();
			const last = cooldownRef.current[type] ?? 0;
			if (now - last < COOLDOWN_MS) return;

			cooldownRef.current[type] = now;

			setScore((prev) => Math.max(0, prev + penalty));
			setCurrentEvent(type);
			setEventLog((prev) => [...prev, { type, timestamp: now, penalty }]);

			
			if (smoothResetRef.current) clearTimeout(smoothResetRef.current);
			smoothResetRef.current = setTimeout(
				() => setCurrentEvent("Smooth Driving"),
				SMOOTH_RESET_MS,
			);
		}

		(async () => {
			const isAvailable = await DeviceMotion.isAvailableAsync();
			setAvailable(isAvailable);
			if (!isAvailable) return;

			DeviceMotion.setUpdateInterval(UPDATE_INTERVAL);

			subscription = DeviceMotion.addListener((data) => {
				const now = Date.now();
				const dt = lastTsRef.current
					? (now - lastTsRef.current) / 1000
					: UPDATE_INTERVAL / 1000;
				lastTsRef.current = now;

				const { acceleration, rotationRate } = data;

				if (acceleration) {
					const ax = acceleration.x ?? 0;
					const ay = acceleration.y ?? 0;
					const az = acceleration.z ?? 0;

					if (ay < -THRESHOLDS.harshBrake) {
						applyPenalty("Harsh Brake", PENALTIES.harshBrake);
					}

					if (ay > THRESHOLDS.harshAcceleration) {
						applyPenalty(
							"Harsh Acceleration",
							PENALTIES.harshAcceleration,
						);
					}

					if (Math.abs(ax) > THRESHOLDS.sharpTurn) {
						applyPenalty("Sharp Turn", PENALTIES.sharpTurn);
					}

					const accelMag = Math.sqrt(ax * ax + ay * ay + az * az);

					if (accelMag < STATIONARY_THRESHOLD) {
						velocityRef.current = { x: 0, y: 0, z: 0 };
					} else {
						velocityRef.current.x += ax * dt;
						velocityRef.current.y += ay * dt;
						velocityRef.current.z += az * dt;

						const speed = Math.sqrt(
							velocityRef.current.x ** 2 +
								velocityRef.current.y ** 2 +
								velocityRef.current.z ** 2,
						);

						if (speed > 0.3) {
							setDistance((prev) => prev + speed * dt);
						}
					}
				}

				if (rotationRate) {
					const rotMag = Math.sqrt(
						(rotationRate.alpha ?? 0) ** 2 +
							(rotationRate.beta ?? 0) ** 2 +
							(rotationRate.gamma ?? 0) ** 2,
					);
					if (rotMag > THRESHOLDS.phoneHandling) {
						applyPenalty("Phone Handling", PENALTIES.phoneHandling);
					}
				}
			});
		})();

		return () => {
			subscription?.remove();
			clearInterval(durationTick);
			if (smoothResetRef.current) clearTimeout(smoothResetRef.current);
		};
	}, []);

	return { available, score, currentEvent, eventLog, distance, duration };
}
