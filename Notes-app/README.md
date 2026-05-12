# 📝 Notes App — React Native (Expo)

A clean, responsive two-screen notes application built with React Native and Expo, featuring a dynamic dark/light theme, adaptive layouts for phones and tablets, and a polished UI system.

---

## 📹 Demo

> 🔗 [Demo Video Link](https://drive.google.com/file/d/1qU3w5o1aVBaVWNm8T6ujfFMUmoKHRsRX/view?usp=sharing) 

---

## 🔗 Repository

> 🔗 [GitHub Repository Link](https://github.com/tarunx-com/Mobile-Dev-Assignments/tree/main/Notes-app) 

---

## 📱 Screens

### Screen 1 — Notes List (`Page1`)
- Grid of note cards displayed in a 2-column `FlatList`
- Search bar to filter notes
- FAB (+) button to navigate to the note editor
- Header with hamburger menu and profile avatar

### Screen 2 — Note Editor (`Page2`)
- Full-screen image banner with tag chips
- Title and body `TextInput` fields
- `KeyboardAvoidingView` for smooth keyboard handling
- Save button and edit FAB

### Entry Point (`index`)
- Page switcher using `useState` to toggle between Page 1 and Page 2

---

## 🧩 Components Used

| Component | Usage |
|---|---|
| `SafeAreaView` | Root container respecting device safe areas |
| `View` | Layout containers throughout both screens |
| `Text` | Headings, body text, tags, dates |
| `TextInput` | Search bar (Page 1), title and body inputs (Page 2) |
| `FlatList` | Note cards grid (Page 1) |
| `ScrollView` | Scrollable editor content (Page 2) |
| `ImageBackground` | Hero banner on the editor screen |
| `Image` | Icons — hamburger, search, profile, mode toggle, arrow, edit |
| `Pressable` | All tappable elements (cards, FAB, buttons, tags) |
| `KeyboardAvoidingView` | Prevents keyboard from obscuring inputs (Page 2) |
| `StatusBar` (Expo) | Adapts status bar style to current theme |

---

## 🪝 Hooks Used

| Hook | Usage |
|---|---|
| `useState` | Theme override (`manualDark`), page navigation (`currentPage`) |
| `useColorScheme` | Reads system-level dark/light preference |
| `useWindowDimensions` | Drives responsive layout — tablet vs phone, portrait vs landscape |
| `useSafeAreaInsets` | Fine-grained inset control for the editor header and bottom padding |

---

## ✨ UI Enhancements & Additional Improvements

- **Manual dark/light toggle** — overrides system theme via a toggle button, persists within the session using `useState`
- **Responsive layout system** — `isTablet` (`width >= 768`) and `isLandscape` (`width > height`) flags adjust font sizes, paddings, icon sizes, and FAB positioning across all form factors
- **Unified theme object** — a single `theme` constant with `light` and `dark` keys drives all colors (background, card, text, subtext, border, accent, accentBg), keeping the UI consistent and easy to extend
- **Accent background tints** — tag chips use a translucent version of the accent color (`#0058bc1a` / `#adc6ff1a`) for a subtle, cohesive look
- **Dynamic image assets** — all icons and the banner image swap between dark and light variants based on the active theme
- **Tag chip system** — notes display multi-tag chips on the card list; the editor supports adding and removing tags inline within the banner area
- **FAB with shadow** — the floating action button uses `elevation`, `shadowColor`, `shadowOffset`, and `shadowRadius` for a native-feeling lift on both iOS and Android
- **`keyboardDismissMode="on-drag"`** — scrolling the editor automatically dismisses the keyboard for a smoother writing experience
- **`scrollEnabled={false}` on body input** — delegates scrolling to the parent `ScrollView`, preventing nested scroll conflicts
- **`numberOfLines` clamping** — note titles are clamped to 2 lines and body previews to 4 lines on the list screen, keeping cards uniform
- **`textAlignVertical="top"`** — ensures the multiline body input starts text from the top on Android

---

## 🗂 Project Structure

```
app/
├── index.tsx          # Entry point — page switcher
├── Page1.tsx          # Notes list screen
└── Page2.tsx          # Note editor screen

assets/images/
├── hamburger-dark.png / hamburger-light.png
├── search-dark.png / search-light.png
├── profile-dark.png / profile-light.png
├── dark-mode.png / light-mode.png
├── arrow-dark.png / arrow-light.png
├── edit-dark.png / edit-light.png
└── banner-dark.png / banner-light.png
```

---

## 🚀 Getting Started

```bash
# 1. Install base dependencies
npm install
```

```bash
# 2. Install Expo Status Bar
npx expo install expo-status-bar
```

```bash
# 3. Install React Native Safe Area Context
npx expo install react-native-safe-area-context
```

```bash
# 4. (iOS only) Install native pods
npx pod-install
```

```bash
# 5. Start Expo dev server
npx expo start
```

> **Why `npx expo install` instead of `npm install`?**
> `npx expo install` automatically picks the version of each library that is compatible with your current Expo SDK, avoiding version mismatch errors.

Scan the QR code with **Expo Go** on your device, or press `i` / `a` to open in an iOS / Android simulator.

---

## 🛠 Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [expo-status-bar](https://docs.expo.dev/versions/latest/sdk/status-bar/)
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)
- TypeScript