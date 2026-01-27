# Figma Design Context

## Figma File Information

- **File URL:** https://www.figma.com/design/60AYkSkEGPv2uYjg0UpRPx/Pragmatics-Engineering-Solutions?node-id=0-1
- **File Key:** `60AYkSkEGPv2uYjg0UpRPx`
- **Canvas Name:** App UI - Dark
- **Device:** iPhone (393x852px)

---

## Screens Identified

### 1. Splash 0 (Loading)
- **Node ID:** `2:164`
- **Description:** Loading animation with 3 green dots
- **Size:** 393x852px

### 2. Splash 1 (Brand)
- **Node ID:** `1:109`
- **Description:** Brand splash screen with PES logo and company name "Pragmatics Engineering Solution"
- **Size:** 393x852px

### 3. Splash 2 (Login)
- **Node ID:** `14:2417`
- **Description:** Login screen with email/password fields, remember me checkbox, login button
- **Size:** 393x852px
- **Components:**
  - PES Logo
  - "Welcome" heading
  - Email/Phone input with envelope icon
  - Password input with lock icon
  - "Remember Me" checkbox
  - Green "Login" button
  - Terms of Use and Privacy Policy links

### 4. Dashboard 2.0
- **Node ID:** `146:182`
- **Description:** Main site summary list with power metrics
- **Size:** 393x1025px
- **Components:**
  - Header with PES logo, filter icon, notification bell
  - Search bar with filter options
  - Site Summary section with Export button
  - Expandable site cards (Lucky Cement Nooribad, Master Molty Foam, Young Food Pvt.)
  - Power metrics: Solar, Wind, Grid, PV Size
  - Power Output Efficiency progress bar
  - Bottom Navigation (Dashboard, Analytics, Add, Setting, Profile) - REMOVED per requirements

### 5. Site Detail Views
#### View 1: Main View (with 4 tabs)
- **Summary Tab Node ID:** `8:1372` (Lucky Cement / View / Summary)
- **Cards Tab Node ID:** `250:422` (Lucky Cement / View / Cards)
- **Alarms Tab Node ID:** `250:1700` (Lucky Cement / View / Alarms)
- **Trends Tab Node ID:** `250:1913` (Lucky Cement / View / Trends)

#### View 2: Live Parameters
- **Node ID:** `14:354` (Lucky Cement / Live Parameters)

#### View 3: Devices
- **Node ID:** `14:1177` (Lucky Cement / Devices)

#### View 4: Alarm Management
- **Node ID:** `14:1748` (Lucky Cement / Alarm)

### 6. Profile Screens
- Profile / Personal Information / Name
- Profile / Security / Password
- Profile / Security / Deactivate

---

## Design Tokens

### Color Palette (Dark Theme)
```
Background Primary:    #0D0D0D
Background Secondary:  #1A1A1A
Background Tertiary:   #262626

Brand Primary:         #00D26A (Green)
Brand Secondary:       #00FF7F (Lighter green)

Text Primary:          #FFFFFF
Text Secondary:        #A0A0A0
Text Muted:            #666666

Status Success:        #00D26A
Status Warning:        #FFB800
Status Error:          #FF4757
Status Info:           #3498DB

Border Default:        #333333
Border Focus:          #00D26A
```

### Typography
```
Font Family: Inter (Regular, Medium, SemiBold, Bold)

Font Sizes:
- xs: 10px
- sm: 12px
- base: 14px
- lg: 16px
- xl: 18px
- 2xl: 24px
- 3xl: 30px
```

### Spacing
```
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 20px
2xl: 24px
3xl: 32px
```

---

## Single Line Diagram (SLD) Specifications

The SLD is a power flow visualization showing energy sources connected to a central site.

### Visual Elements
- **Background:** Dark (#0D0D0D) with dot grid pattern
- **Central Node:** Site name with load value (e.g., "Lucky Cement, Load: 315.44")
- **Source Nodes:** Solar panels, Wind turbines, Grid, PCS
- **Metric Displays:** Q and PF values for each source
- **Power Flow Lines:**
  - Green dashed: Renewable energy (Solar/Wind)
  - Blue solid/dashed: Grid power
- **Controls:** Zoom +/-, Lock toggle, Fullscreen

### SLD Colors
```
Dot Grid:              #2A2A2A
Renewable Edge:        #00D26A (Green)
Grid Edge:             #3B82F6 (Blue)
Site Node Border:      #EF4444 (Red)
Site Node Icon:        #EF4444 (Red)
Source Node Border:    #333333
Metric Text:           #A0A0A0
```

### Node Types
1. **SiteNode** - Central factory/site with name and load
2. **SourceNode** - Power sources (solar, wind, grid, pcs) with icons
3. **MetricNode** - Q and PF value displays

### Edge Types
1. **PowerFlowEdge** - Animated dashed lines with bezier curves

---

## Component Inventory

### Icons Used
- envelope (email input)
- lock (password input)
- notification/bell
- solar-panel
- fan (wind)
- volcano (site icon)
- ellipsis-vertical (more options)
- up-to-bracket (export)
- square-plus (add)
- gear (settings)
- user (profile)
- hamburger (drawer menu)
- arrow-right
- chart-line
- chart-mixed
- octagon-check (success)
- octagon-xmark (error)
- triangle-exclamation (warning)

### Reusable Components
- Status Bar (iPhone)
- Home Indicator
- Master-Button (Primary action button)
- Navigation bar (Bottom tabs - REMOVED)
- Header (Shoppin-Headers)
- Table rows
- Chart components (Line, Bar, Area)
- Tag checkbox
- Search input
- Metric cards
- Site cards (expandable)
- Power efficiency progress bar

---

## Navigation Structure

```
App Launch
├── Splash 0 (Loading)
├── Splash 1 (Brand)
└── Splash 2 (Login)
    │
    ▼ (Authenticated)

Dashboard (with Drawer)
├── Header: [☰ Drawer] [Logo] [Notifications]
├── Search & Filters
└── Site Card List
    │
    ├── (Tap Card) → Site Detail
    │   ├── View 1: Main View (4 tabs)
    │   │   ├── Summary Tab (with SLD + Charts)
    │   │   ├── Cards Tab
    │   │   ├── Alarms Tab
    │   │   └── Trends Tab
    │   ├── View 2: Live Parameters
    │   ├── View 3: Devices
    │   └── View 4: Alarm Management
    │
    └── (Tap ☰) → Drawer Menu
        ├── Profile
        │   ├── Edit Profile
        │   ├── Change Password
        │   └── Deactivate Account
        ├── Terms & Conditions
        ├── About Us
        └── Logout
```

---

## Notes

1. **No Bottom Tabs** - Navigation is via Drawer menu only
2. **Dark Theme Only** - No light mode variant in design
3. **SLD uses React Flow** - Requires WebView wrapper for React Native
4. **Charts use ECharts** - react-native-echarts-pro library
5. **Real-time updates** - AWS IoT PubSub for live data
