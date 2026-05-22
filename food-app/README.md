# 🍔 QuickBite — Food Delivery App

A full-featured React Native food delivery app built with **Expo** and **React Navigation**, demonstrating all major navigation patterns in one cohesive flow.

---

## 📹 Demo

> 🔗 [Demo Video Link](https://drive.google.com/file/d/1LrRWxd_MmJE6Y5vrUiD3_jsWcKsnOqKL/view?usp=sharing) 

---

## 🔗 Repository

> 🔗 [GitHub Repository Link](https://github.com/tarunx-com/Mobile-Dev-Assignments/tree/main/food-app) 

---

## 📋 Project Overview

QuickBite is a mobile food delivery application that showcases:
- Conditional authentication flow (login vs. main app)
- Onboarding experience
- Nested navigators (Stack → Tabs → Stack → Drawer)
- Deep linking support
- Persisted auth state
- Cart badge, custom headers, and custom drawer content

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| Expo (SDK 51+) | Project setup, native modules |
| React Navigation v6 | All navigation patterns |
| Native Stack Navigator | Onboarding → Auth → Main flow |
| Bottom Tab Navigator | Home / Search / Orders / Profile |
| Drawer Navigator | Profile-accessible side menu |
| Material Top Tabs | Login / Sign Up switcher |
| `@expo/vector-icons` | Tab and drawer icons |
| `expo-linking` | Deep link support |
| React Context API | Auth state & Cart state |

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator / Android Emulator or Expo Go app

### Install Dependencies

```bash
# Clone the repo
git clone <your-repo-url>
cd quickbite

# Install all dependencies
npm install
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npm install @react-navigation/elements
npm install @react-navigation/material-top-tabs
npx expo install @expo/vector-icons
npm install @react-navigation/drawer
npx expo install react-native-gesture-handler react-native-reanimated react-native-worklets
npm install @react-navigation/bottom-tabs
npx expo install expo-linking

# iOS only
npx pod-install ios
```

### Start the App

```bash
npx expo start
```

Press `i` for iOS, `a` for Android, or scan QR with Expo Go.

---

## 🗺 Navigation Structure

### Architecture Overview

```
RootNavigation (NavigationContainer)
│
└── RootStack (NativeStackNavigator)
    │
    ├── [Unauthenticated]
    │   ├── onBoard  ─────────────────  OnBoardingScreen
    │   │                               └── "Get Started" / "SKIP" → Auth
    │   └── Auth  ────────────────────  AuthNav (MaterialTopTabNavigator)
    │                                   ├── Log In   → LogInScreen
    │                                   └── Sign Up  → SignInScreen
    │
    └── [Authenticated]
        └── HomeDrawer  ──────────────  MyDrawer (DrawerNavigator)
            │                          Custom drawer: avatar, name, email
            ├── MainTab  ────────────  MainTabs (BottomTabNavigator)
            │   ├── Home  ───────────  HomeStack (NativeStackNavigator)
            │   │   ├── HomeMain  ──  HomeScreen
            │   │   ├── Details  ───  DetailsScreen   ← hides tab bar
            │   │   └── Cart  ──────  MyCartScreen    ← hides tab bar
            │   ├── Search  ────────  SearchScreen
            │   ├── Orders  ────────  MyCartScreen    (badge when cart > 0)
            │   └── Profile  ───────  ProfileScreen   (opens Drawer)
            ├── Settings  ──────────  SettingsScreen
            └── Help & Support  ────  HelpScreen
```

### Navigation Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        APP LAUNCH                           │
└─────────────────────┬───────────────────────────────────────┘
                      │
          ┌───────────▼───────────┐
          │   isLoggedIn check    │
          └───────┬───────┬───────┘
                  │       │
           false  │       │  true
                  ▼       ▼
          ┌───────────┐ ┌──────────────────────────────────┐
          │ ONBOARDING│ │         HOME DRAWER               │
          │  Screen   │ │  (Drawer Navigator)               │
          └─────┬─────┘ │  ┌───────────────────────────┐   │
                │       │  │  MAIN TABS (Bottom Tabs)   │   │
         SKIP / │       │  │  🏠 Home  🔍 Search        │   │
       Get Started      │  │  🛒 Orders  👤 Profile     │   │
                ▼       │  └───────────────────────────┘   │
          ┌──────────┐  │  ┌──────────┐  ┌──────────────┐  │
          │   AUTH   │  │  │ Settings │  │ Help&Support │  │
          │ (Top Tab)│  │  └──────────┘  └──────────────┘  │
          │ Login /  │  └──────────────────────────────────┘
          │ Sign Up  │
          └─────┬────┘
                │ login()
                ▼
         Auth state saved
         → navigate to HomeDrawer

─────────────────────────────────────────────────────────────
 HOME TAB STACK
─────────────────────────────────────────────────────────────

  HomeMain ──(tap restaurant)──► DetailsScreen
                                      │ (tab bar hidden)
                                      │
                                 ─────▼─────
                                  Add to Cart
                                 ─────┬─────
                                      │ navigate('Cart')
                                      ▼
                                  CartScreen
                                 (tab bar hidden)

─────────────────────────────────────────────────────────────
 DRAWER (accessible via ☰ hamburger or Profile tab)
─────────────────────────────────────────────────────────────

  Profile Tab ──(open drawer)──► Drawer opens
                                  ├── My Orders → Orders tab
                                  ├── Settings  → SettingsScreen
                                  ├── Help      → HelpScreen
                                  ├── Toggle Theme
                                  └── Logout    → clears auth → OnBoarding
```

---

## 🔗 Deep Linking Setup ✅

---

## 🧭 Programmatic Navigation Usage

| Method | Used Where | Purpose |
|---|---|---|
| `navigate('Details', { itemId })` | HomeScreen | Go to restaurant detail with params |
| `navigate('Cart')` | DetailsScreen | Go to cart |
| `goBack()` | DetailsScreen, CartScreen | Return to previous screen |
| `replace('HomeDrawer')` | AuthNav after login | Replace auth stack so back doesn't go to login |
| `reset(...)` | Logout | Reset stack to OnBoarding / Auth |
| `DrawerActions.openDrawer()` | Header hamburger button | Programmatically open drawer |

---

## 🔐 Auth Flow

Auth state is managed via `AuthHelper` (React Context + AsyncStorage).

```
App Launch
    │
    ├── AsyncStorage has token?
    │       YES → isLoggedIn = true  → HomeDrawer (skip onboarding)
    │       NO  → isLoggedIn = false → OnBoarding → Auth
    │
Login/SignUp success
    │
    └── save token to AsyncStorage
        set isLoggedIn = true
        navigation.replace('HomeDrawer')   ← can't go back to login

Logout
    │
    └── clear AsyncStorage token
        set isLoggedIn = false
        navigation.reset({ routes: [{ name: 'onBoard' }] })
```

---

## 📁 Project Structure

```
src/
├── data/
│   ├── AuthHelper.tsx      # Auth context + AsyncStorage persistence
│   └── CartData.tsx        # Cart context (items, increment, decrement)
│
├── Navigation/
│   ├── RootNavigation.tsx  # Root stack + linking config + providers
│   ├── AuthNav.tsx         # Material top tabs (Login / Sign Up)
│   ├── DrawerNav.tsx       # Drawer navigator + custom drawer content
│   └── MainTab.tsx         # Bottom tabs + HomeStack + custom header
│
├── Screens/
│   ├── OnBoardingScreen.tsx
│   ├── LogInScreen.tsx
│   ├── SignInScreen.tsx
│   ├── HomeScreen.tsx
│   ├── DetailsScreen.tsx   # Restaurant detail — receives { itemId } param
│   ├── MyCartScreen.tsx
│   ├── SearchScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── SettingsScreen.tsx
│   └── HelpScreen.tsx
│
└── theme/
    └── theme.tsx           # Theme context (light/dark + CSS-like vars)
```



---

## ⚙️ Assumptions Made

1. **Mock Auth** — Login accepts any credentials and stores a mock token in AsyncStorage. No real backend.
2. **Cart as Context** — Cart state lives in `CartData` context (in-memory + no persistence across app restarts).
3. **Restaurant Data** — Home screen uses hardcoded/mock restaurant data; no API calls.
4. **Tab bar hiding** — `Details` and `Cart` screens hide the bottom tab bar via `tabBarStyle: { display: 'none' }` in screen options.
5. **Drawer access** — Drawer is triggered both from the hamburger `☰` icon in the custom header AND from the Profile tab.
6. **Theme toggle** — Dark/light mode is toggled from the drawer and persists using the theme context.

---

## 📊 Navigation Diagram (TLDraw)

> 🔗 [View Navigation Diagram on TLDraw](https://www.tldraw.com) ←

---


## ThankYou!