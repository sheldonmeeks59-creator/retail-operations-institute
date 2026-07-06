import fs from "fs";
import path from "path";

const HEADSHOT_FILE_PATH = path.join(process.cwd(), "public", "images", "profile", "headshot.jpg");

/**
 * Server-only: auto-detects whether a real headshot has been dropped into
 * public/images/profile/headshot.jpg. Import this only from Server
 * Components (page files) — never from a "use client" component, since it
 * pulls in Node's fs/path modules.
 */
export function hasHeadshot(): boolean {
  try {
    return fs.existsSync(HEADSHOT_FILE_PATH);
  } catch {
    return false;
  }
}
