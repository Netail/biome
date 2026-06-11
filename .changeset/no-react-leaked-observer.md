---
"@biomejs/biome": patch
---

Added the new nursery rule [`noReactLeakedObserver`](https://biomejs.dev/linter/rules/no-react-leaked-observer) rule. This rule enforces that every `IntersectionObserver`, `ResizeObserver` & `MutationObserver` in a React component or custom hook has a corresponding `disconnect` in the cleanup function of `useEffect`. Forgetting to disconnect an observer can lead to memory leaks and unexpected behavior after component unmounts or dependency changes.
