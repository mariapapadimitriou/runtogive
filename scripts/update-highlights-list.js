#!/usr/bin/env node
/**
 * Scans images/photos/highlights and writes list.json with image filenames.
 * Run from repo root: node scripts/update-highlights-list.js
 * After adding/removing photos in highlights, run this and commit the updated list.json.
 */

const fs = require("fs");
const path = require("path");

const HIGHLIGHTS_DIR = path.join(__dirname, "..", "images", "photos", "highlights");
const LIST_FILE = path.join(HIGHLIGHTS_DIR, "list.json");
const IMG_EXT = /\.(jpg|jpeg|png|gif|webp)$/i;

try {
  const names = fs.readdirSync(HIGHLIGHTS_DIR);
  const images = names
    .filter(function (name) {
      return name !== "list.json" && name !== ".DS_Store" && IMG_EXT.test(name);
    })
    .sort();

  fs.writeFileSync(LIST_FILE, JSON.stringify(images) + "\n", "utf8");
  console.log("Updated " + LIST_FILE + " with " + images.length + " image(s).");
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
