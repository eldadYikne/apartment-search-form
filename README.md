# 🏠 Apartment Search Form

> A beautiful, RTL Hebrew apartment search form built with React + TypeScript, designed from Figma and powered by Claude Code.

---

## 📸 Preview

```
┌─────────────────────────────────────────┐
│                                         │
│        אנחנו נעזור לך למצוא דירה!       │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  למשל: שמעון, ירושלים           │   │
│   └─────────────────────────────────┘   │
│                                         │
│    [90]  [88]  [150]  [+200]  מ"ר      │
│    [1] [2] [3] [4] [5] [+6]  חדרים    │
│                                         │
│   $200,000 ━━━━━━━●━━━ $5,000,000      │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  מגורים                    ▼    │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  העדפות...                      │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌───────────────┐ ┌───────────────┐   │
│   │  מספר הנייד    │ │  המייל שלך    │   │
│   └───────────────┘ └───────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │      ← קדימה, שלחו לי          │   │
│   └─────────────────────────────────┘   │
│                                         │
│          🟢  מעניין אותי  WhatsApp      │
│                                         │
└─────────────────────────────────────────┘
```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌐 **RTL Support** | Full right-to-left layout for Hebrew |
| 🎨 **Figma-to-Code** | Pixel-perfect implementation from Figma design |
| ✅ **Input Validation** | Real-time validation with red error messages |
| 🔘 **Chip Selectors** | Toggle buttons for rooms & square meters |
| 📊 **Budget Slider** | Range slider with formatted currency display |
| 📱 **Responsive** | Mobile-friendly design |
| 🧪 **30 Unit Tests** | Full test coverage with Jest + Testing Library |
| 🟢 **WhatsApp CTA** | Call-to-action button for WhatsApp group |

---

## 🛠️ Tech Stack

```
React 18        ──── UI Framework
TypeScript 4.9  ──── Type Safety
Jest 29         ──── Test Runner
Testing Library ──── Component Testing
CSS (BEM)       ──── Styling Methodology
Create React App ─── Build Tooling
```

---

## 🚀 Quick Start

```bash
# 1. Clone or navigate to the project
cd apartment-search-form

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Open in browser
# http://localhost:3000
```

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run with detailed output
npm test -- --verbose

# Run with coverage report
npm test -- --coverage

# Run once (no watch mode)
npm test -- --watchAll=false
```

### Test Results

```
 PASS  src/components/ApartmentSearchForm/ApartmentSearchForm.test.tsx

 ✓ renders the form
 ✓ renders the title
 ✓ renders the location input with placeholder
 ✓ allows typing in the location input
 ✓ renders square meter chip options
 ✓ toggles square meter chip on click
 ✓ renders room chip options
 ✓ toggles room chip on click
 ✓ only allows one room chip active at a time
 ✓ renders the budget slider
 ✓ updates budget display when slider changes
 ✓ renders the purpose select with default value
 ✓ allows changing the purpose
 ✓ renders the preferences textarea
 ✓ allows typing in preferences
 ✓ renders the dealbreakers textarea
 ✓ renders email and phone inputs
 ✓ allows typing in contact fields
 ✓ renders the submit button
 ✓ renders the WhatsApp CTA button
 ✓ submits the form without errors
 ✓ shows error when typing numbers in location input
 ✓ allows Hebrew letters in location input
 ✓ shows error when typing numbers in preferences
 ✓ shows error when typing numbers in dealbreakers
 ✓ shows error when typing letters in phone input
 ✓ allows numbers in phone input
 ✓ shows error for invalid email
 ✓ clears email error for valid email
 ✓ shows red border on invalid inputs

 Test Suites:  1 passed, 1 total
 Tests:       30 passed, 30 total
```

---

## 📁 Project Structure

```
apartment-search-form/
│
├── public/
│   └── index.html                 # HTML entry point
│
├── src/
│   ├── index.tsx                  # React DOM render
│   ├── App.tsx                    # Root component
│   ├── react-app-env.d.ts        # CRA TypeScript types
│   │
│   └── components/
│       └── ApartmentSearchForm/
│           ├── ApartmentSearchForm.tsx       # Main component
│           ├── ApartmentSearchForm.css       # Styles (BEM)
│           ├── ApartmentSearchForm.test.tsx  # Unit tests
│           └── index.ts                     # Barrel export
│
├── package.json
├── tsconfig.json
├── PROJECT-GUIDE.txt              # Guide for students
├── TEST-LOGS.txt                  # Test execution logs
└── README.md                      # This file
```

---

## 🎯 Form Sections

| # | Section | Type | Details |
|---|---------|------|---------|
| 1 | **Title** | Header | "!אנחנו נעזור לך למצוא דירה" |
| 2 | **Location** | Text Input | Area & city, letters only |
| 3 | **Square Meters** | Chip Selector | 90, 88, 150, +200 |
| 4 | **Rooms** | Chip Selector | 1, 2, 3, 4, 5, +6 |
| 5 | **Budget** | Range Slider | $200,000 - $5,000,000 |
| 6 | **Purpose** | Dropdown | Residential / Investment / Rental |
| 7 | **Preferences** | Textarea | Letters only |
| 8 | **Dealbreakers** | Textarea | Letters only |
| 9 | **Email** | Email Input | Email format validation |
| 10 | **Phone** | Tel Input | Numbers only |
| 11 | **Submit** | Button | Blue gradient CTA |
| 12 | **WhatsApp** | Button | Green join group CTA |

---

## 🔒 Validation Rules

```
┌──────────────────┬────────────────────┬──────────────────────────┐
│  Field           │  Rule              │  Error Message           │
├──────────────────┼────────────────────┼──────────────────────────┤
│  Location        │  Letters only      │  ניתן להזין אותיות בלבד  │
│  Preferences     │  Letters only      │  ניתן להזין אותיות בלבד  │
│  Dealbreakers    │  Letters only      │  ניתן להזין אותיות בלבד  │
│  Phone           │  Numbers only      │  ניתן להזין מספרים בלבד  │
│  Email           │  Valid email       │  כתובת אימייל לא תקינה   │
└──────────────────┴────────────────────┴──────────────────────────┘
```

- Red error text appears below invalid inputs
- Input borders turn red on validation errors
- Errors clear automatically when valid input is entered

---

## 🎨 Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| 🔵 Primary Blue | `#1a8ceb` | Title, active states |
| 🔵 Light Blue | `#3eaafc` | Borders, buttons, accents |
| 🔵 Pale Blue | `#b8dffb` | Input borders, inactive chips |
| 🔵 Sky Blue | `#5cb8f7` | Labels |
| ⚪ White | `#ffffff` | Card background |
| ⬛ Dark | `#333333` | Body text |
| 🔴 Error Red | `#e53935` | Validation errors |
| 🟢 WhatsApp Green | `#25d366` | WhatsApp button |

### Typography
- Font: Segoe UI / Tahoma / Arial (system fonts)
- Title: 26px, weight 800
- Labels: 14px, weight 600
- Inputs: 14px, weight 400

### Spacing
- Card padding: 36px top, 28px sides
- Section margin: 20px bottom
- Chip gap: 10px
- Border radius: 30px (inputs), 20px (card), 16px (textarea)

---

## 🔄 Workflow

```
  Figma Design
       │
       ▼
  Claude Code reads the design
       │
       ▼
  React Component created (.tsx)
       │
       ▼
  CSS Styles written (.css)
       │
       ▼
  Validation logic added
       │
       ▼
  Unit Tests written (.test.tsx)
       │
       ▼
  All 30 tests passing ✓
       │
       ▼
  Ready for review! 🚀
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server with hot reload |
| `npm test` | Run tests in watch mode |
| `npm run build` | Create optimized production build |
| `npm run eject` | Eject from CRA (one-way!) |

---

## 🤖 Built With Claude Code

This entire project was generated using **Claude Code** CLI with:
- **Figma MCP** - Reading the design directly from Figma
- **Google Tasks MCP** - Task management integration
- **React + TypeScript** - Component development
- **Jest + Testing Library** - Automated testing

---

## 📄 License

This project is for educational and demonstration purposes.

---

<p align="center">
  <b>Made with ❤️ using Claude Code</b>
</p>
