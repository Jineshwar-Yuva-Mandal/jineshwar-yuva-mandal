import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outFile = path.join(root, "src", "lib", "public-images.ts");
const imageExt = /\.(jpg|jpeg|png|webp|gif|avif)$/i;

function list(dir) {
  const absoluteDir = path.join(root, "public", dir);
  if (!fs.existsSync(absoluteDir)) return [];

  return fs
    .readdirSync(absoluteDir)
    .filter((file) => imageExt.test(file))
    .sort((first, second) => first.localeCompare(second, undefined, { numeric: true }))
    .map((file) => `/${path.posix.join(dir, file)}`);
}

function mapDirs(dir) {
  const absoluteDir = path.join(root, "public", dir);
  if (!fs.existsSync(absoluteDir)) return {};

  return Object.fromEntries(
    fs
      .readdirSync(absoluteDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => [entry.name, list(path.posix.join(dir, entry.name))])
      .filter(([, files]) => files.length)
  );
}

const content = `export const eventImages = ${JSON.stringify(mapDirs("images/events"), null, 2)} as const;

export const galleryImages = ${JSON.stringify(list("images/gallery"), null, 2)} as const;

export const memberImages = ${JSON.stringify(mapDirs("images/members"), null, 2)} as const;

type ImageMap = Record<string, readonly string[]>;

function byFileName(pathname: string) {
  return pathname.split("/").pop()?.toLowerCase() ?? "";
}

function numericSort(first: string, second: string) {
  return first.localeCompare(second, undefined, { numeric: true });
}

function descendingSort(first: string, second: string) {
  return second.localeCompare(first, undefined, { numeric: true });
}

export function getEventImageSet(eventId: string) {
  const images = [...(((eventImages as ImageMap)[eventId]) ?? [])];
  const coverImage = images.find((image) => byFileName(image).startsWith("cover.")) ?? null;
  const logoImage = images.find((image) => byFileName(image).startsWith("logo.")) ?? null;
  const galleryImages = images
    .filter((image) => {
      const fileName = byFileName(image);
      return !fileName.startsWith("cover.") && !fileName.startsWith("logo.");
    })
    .sort(descendingSort);

  return { coverImage, logoImage, galleryImages };
}

export function getEventAlbumImages(eventId: string) {
  return [...(((eventImages as ImageMap)[eventId]) ?? [])].sort(numericSort);
}

export function getMiscGalleryImages() {
  return [...galleryImages].sort(numericSort);
}

export function getAllPastEventImages(eventIds: string[]) {
  return eventIds.flatMap((eventId) => getEventImageSet(eventId).galleryImages);
}

export function getMemberProfilePhoto(memberId: string) {
  const images = [...(((memberImages as ImageMap)[memberId]) ?? [])];
  return images.find((image) => byFileName(image).startsWith("profile.")) ?? images[0] ?? null;
}
`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, content);
console.log(`Generated ${path.relative(root, outFile)}`);
