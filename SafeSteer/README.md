# SafeSteer 🚗

SafeSteer is a mobile driving safety monitoring application built with Expo and React Native. The app uses real-time device motion sensors to detect unsafe driving behaviors such as harsh braking, rapid acceleration, sharp turns, and phone handling while driving.

The goal is to encourage safer driving habits by providing a live safety score, event tracking, trip statistics, and historical driving records.

---

## 📹 Demo

> 🔗 [Demo Video Link]() 

---

## 🔗 Repository

> 🔗 [GitHub Repository Link](https://github.com/tarunx-com/Mobile-Dev-Assignments/tree/main/SafeSteer) 

---

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/safesteer.git
cd safesteer
```


## Features

* Real-time driving safety monitoring
* Live safety score (0–100)
* Detection of:

  * Harsh Braking
  * Harsh Acceleration
  * Sharp Turns
  * Phone Handling While Driving
* Trip duration tracking
* Distance estimation using accelerometer data
* Local trip history storage
* Dark Mode and Light Mode support
* Responsive layouts for portrait and landscape devices

---

## Tech Stack

### Framework & Runtime

* React Native
* Expo
* Expo Router
* TypeScript

### Sensors

* expo-sensors (DeviceMotion)

### Storage

* expo-sqlite

### UI & Graphics

* react-native-svg
* expo-blur
* @expo/vector-icons

---

## Dependencies

```bash
expo
expo-router
expo-sensors
expo-sqlite
expo-status-bar
expo-blur
react-native-svg
@expo/vector-icons
```

---

## Sensor Usage

### DeviceMotion

SafeSteer uses Expo's DeviceMotion API to access:

#### Accelerometer Data

Used for:

* Harsh Braking Detection
* Harsh Acceleration Detection
* Sharp Turn Detection
* Distance Estimation

Values monitored:

```ts
acceleration.x
acceleration.y
acceleration.z
```

#### Rotation Data

Used for:

* Phone Handling Detection

Values monitored:

```ts
rotationRate.alpha
rotationRate.beta
rotationRate.gamma
```

---

## Event Detection Strategy

Sensor data is sampled every:

```ts
200 ms
```

To avoid repeated triggering from a single movement event, a cooldown period is applied:

```ts
2500 ms
```

When an event is detected:

1. Driving score is reduced.
2. Event is added to the event log.
3. UI displays the active event.
4. Status automatically returns to "Smooth Driving" after 2 seconds.

---

## Threshold Values

### Harsh Braking

Triggered when:

```ts
acceleration.y < -6
```

Penalty:

```ts
-2 points
```

---

### Harsh Acceleration

Triggered when:

```ts
acceleration.y > 5
```

Penalty:

```ts
-2 points
```

---

### Sharp Turn

Triggered when:

```ts
Math.abs(acceleration.x) > 4.2
```

Penalty:

```ts
-1 point
```

---

### Phone Handling

Triggered when rotational movement exceeds:

```ts
180
```

Calculated using:

```ts
sqrt(
 alpha² +
 beta² +
 gamma²
)
```

Penalty:

```ts
-3 points
```

---

## Driving Score Calculation

Each drive starts with a score of:

```ts
100
```

Penalties are applied whenever unsafe events are detected.

| Event              | Penalty |
| ------------------ | ------- |
| Harsh Brake        | -2      |
| Harsh Acceleration | -2      |
| Sharp Turn         | -1      |
| Phone Handling     | -3      |

Formula:

```text
Score = 100 - Total Penalties
```

The score is clamped to:

```text
0 ≤ Score ≤ 100
```

---

## Distance Calculation

SafeSteer estimates distance using accelerometer integration.

### Process

1. Acceleration is sampled.
2. Velocity is estimated by integrating acceleration over time.
3. Distance is estimated from velocity over time.

Simplified:

```text
velocity += acceleration × dt
distance += velocity × dt
```

### Stationary Detection

When acceleration magnitude falls below:

```ts
0.5
```

Velocity is reset to avoid drift.

---

## Assumptions

### Distance Estimation

Distance is estimated using only DeviceMotion sensor data.

Because GPS is not used:

* Distance values are approximations.
* Long drives may accumulate sensor drift.
* Results should not be treated as GPS-accurate measurements.

### Device Orientation

The application assumes the phone remains relatively stable while driving.

Large movements of the phone may:

* Trigger Phone Handling events
* Affect distance estimation

### Sensor Availability

The application requires DeviceMotion support on the device.

If unavailable:

* Drive monitoring cannot start.

### Local Storage

Trip history is stored locally using SQLite.

Data is not synchronized to any cloud service.

---

## Database Schema

```sql
CREATE TABLE history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    score INTEGER,
    distance REAL,
    date TEXT DEFAULT (datetime('now')),
    duration INTEGER
);
```

---

## Theme System

SafeSteer supports:

* Light Theme
* Dark Theme
* Manual Theme Toggle
* Automatic system theme detection

Theme state is managed using React Context.

---

## Project Structure

```text
app/
├── (tabs)
│   ├── index.tsx
│   └── HistoryScreen.tsx
│
├── (app)
│   └── DriveScreen.tsx
│
├── components
│   └── Background.tsx
│
db/
└── db.ts

hooks/
└── use-device-motion.ts

theme/
└── theme.tsx
```

---

## How to Run Locally

### 1. Clone Repository

```bash
git clone <repository-url>
cd SafeSteer
```

### 2. Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---


### Required Packages

If setting up from scratch, install the following packages:

#### Expo Router

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens
```

#### SQLite Database

```bash
npx expo install expo-sqlite
```

#### Device Motion Sensors

```bash
npx expo install expo-sensors
```

#### SVG Support

```bash
npx expo install react-native-svg
```

#### Blur Effects

```bash
npx expo install expo-blur
```

#### Status Bar

```bash
npx expo install expo-status-bar
```

#### Icons

```bash
npx expo install @expo/vector-icons
```

---

### 3. Start Development Server

```bash
npx expo start
```

---

### 4. Run Application

Android:

```bash
npx expo run:android
```

iOS:

```bash
npx expo run:ios
```

Or scan the QR code using Expo Go.

---

## Screenshots

Add screenshots here:

### Home Screen

![Home](screenshots/home.png)

### Drive Screen

![Drive](screenshots/drive.png)

### History Screen

![History](screenshots/history.png)

---

## Future Improvements

* GPS-based distance calculation
* Background trip tracking
* Cloud backup and synchronization
* Trip analytics dashboard
* Driver performance trends
* Machine learning based event classification
* Export trip reports

---

## Author

Built using React Native, Expo, SQLite, and DeviceMotion sensors as a lightweight driver safety monitoring application.
