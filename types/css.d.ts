// Type declarations for importing plain CSS files (global CSS)
// This prevents TypeScript errors like:
// "Cannot find module or type declarations for side-effect import of './globals.css'"

declare module "*.css";
declare module "*.scss";
declare module "*.sass";
