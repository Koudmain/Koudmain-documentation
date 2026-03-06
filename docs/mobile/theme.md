---
sidebar_position: 2
---


# Theme Usage Guide

This guide outlines the standardized classes for colors and spacing as defined in your Tailwind configuration.

### 1. Colors

Use the following naming conventions for background (`bg-`), text (`text-`), and border (`border-`) utilities.

#### Primary & Secondary

* **Default:** `primary` | `secondary`
* **Interactions:** `primary-hover`, `primary-active`, `primary-focus`
* **States:** `primary-disabled`
* **Contrast:** `primary-content` (Use this for text/icons on top of primary backgrounds).

#### Semantic States

Each functional color includes three variants:

* **Default:** `success`, `error`, `warning`, `info`
* **Muted:** `success-muted` (Ideal for alert backgrounds).
* **Dark:** `success-dark` (Ideal for button hovers or dark text).

#### Neutrals & Surfaces

* **Grays:** `neutral-100` (White) to `neutral-900` (Darkest).
* **Layout:** `surface-background` (Page body), `surface-card` (Containers), `surface-backdrop` (Modal overlays).

---

### 2. Typography

Two font families are available. Apply them using `font-{name}`:

* **Default Sans:** `font-sans` (Stacks Inter then Plus Jakarta Sans).
* **Specific:** `font-inter` or `font-jakarta`.

---

### 3. Spacing & Radius

#### Spacing

The spacing scale uses a `rem` base where `4` equals `1rem` (16px).

* **Small:** `1` (4px), `2` (8px).
* **Layout:** `4` (16px), `6` (24px), `8` (32px).
* **Large:** `12` (48px), `16` (64px).

#### Border Radius

* **Small:** `rounded-sm` (2px).
* **Medium:** `rounded` (4px).
* **Large:** `rounded-lg` (8px).
* **Pill:** `rounded-full`.

---

### 4. Component Example

```tsx
// Example of a Primary Button
<TouchableOpacity className="bg-primary hover:bg-primary-hover active:bg-primary-active p-4 rounded-lg">
  <Text className="text-primary-content font-inter font-bold">
    Submit
  </Text>
</TouchableOpacity>

// Example of an Error Alert
<View className="bg-error-muted border border-error p-3 rounded">
  <Text className="text-error-dark">Action failed</Text>
</View>

```
