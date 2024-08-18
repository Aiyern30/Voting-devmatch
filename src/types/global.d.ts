export {};

declare global {
  interface Window {
    ethereum?: any; // Add the ethereum property to the Window interface
  }
}
