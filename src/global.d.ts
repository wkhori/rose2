// global.d.ts
export { };

declare global {
  interface Window {
    Jupiter: any; // Use a more specific type if you know the structure of Jupiter
  }
}
