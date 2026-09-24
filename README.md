# Elmiron Learning — clickable demo

A web build of the **Elmiron Learning** design: the learning module for MRs, their managers and a training admin.
The 19 screens match the design, and the core loops are wired end to end.

- **Flow A · MR learner:** home → course → video → document → assessment → result → certificate → history
- **Flow B · Manager:** team training exceptions → an MR's training record
- **Flow C · Training admin:** dashboard → course builder → question bank → assign → reports

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in dist/ (relative paths, so it can be hosted anywhere)
```

## How it's put together

| Path | What it is |
| --- | --- |
| `src/state.ts` | Demo data and interactions (filters, answers, toggles, video playback), plus hash routing (`#/a1`, `#/c4`, …) |
| `src/screens/generated/` | One component per screen, converted from the design with the original inline styles. Safe to edit by hand |
| `src/screens/generated/pseudo.css` | The design's hover and focus states |
| `src/components/Landing.tsx` | Overview page: hero, status legend, index of every screen |
| `src/components/DemoBar.tsx` | The dashed demo control: previous/next, "All screens" menu, exit |
| `src/animations.css` | Every screen animation, keyed off a few classes on the screens (`screen-main`, `card`, `pill`, `bar-fill`, `overlay-in`, `tap`) |

## Motion

The design notes ask for calm ("no confetti, no badge"), so the motion is functional and restrained:

- **Navigation:** switching role (MR / Manager / Admin) moves the whole shell. Moving within a flow keeps the sidebar still and cascades the new content in. A thin sweep runs across the top on every navigation.
- **Content:** cards and rows fade up in sequence, status pills pop in, progress and chart bars grow from zero, and headline numbers count up.
- **Interactions:** buttons press, clickable cards lift, sidebar items nudge on hover, switches slide, selections pop, document pages turn, report tabs and course filters crossfade their rows, and the submit dialog scales in over a fading backdrop.
- **Video lesson (A4):** press play and it really plays. The playhead, time and watched percentage advance, and the lesson unlocks at 90%.
- **Landing:** the headline reveals word by word, a live course queue works itself down, and sections animate in as you scroll.
- `prefers-reduced-motion` turns all of it off.

Keyboard: `Alt + ←/→` steps through the screens in demo mode, and `Esc` closes the screen menu.
