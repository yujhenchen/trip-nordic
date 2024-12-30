import type { UserRecord } from "firebase-admin/auth";

declare global {
  namespace Vike {
    interface PageContext {
      user?: UserRecord | null;
    }
  }
}

declare module "express" {
  interface Request {
    user?: UserRecord | null;
  }
}

// biome-ignore lint/complexity/noUselessEmptyExport: ensure that the file is considered as a module
export {};
