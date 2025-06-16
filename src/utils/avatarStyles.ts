export const AVATAR_STYLES = [
  "adventurer",
  "adventurerNeutral",
  "avataaars",
  "avataaarsNeutral",
  "bigEars",
  "bigEarsNeutral",
  "bigSmile",
  "bottts",
  "botttsNeutral",
  "croodles",
  "croodlesNeutral",
  "dylan",
  "funEmoji",
  "glass",
  "icons",
  "identicon",
  "initials",
  "lorelei",
  "loreleiNeutral",
  "micah",
  "miniavs",
  "notionists",
  "notionistsNeutral",
  "openPeeps",
  "personas",
  "pixelArt",
  "pixelArtNeutral",
  "rings",
  "shapes",
  "thumbs",
] as const;

export type AvatarStyleType = (typeof AVATAR_STYLES)[number];

// Utility function to dynamically import individual styles
export const importAvatarStyle = async (styleName: string) => {
  try {
    switch (styleName) {
      case "adventurer":
        return await import("@dicebear/adventurer");
      case "adventurerNeutral":
        return await import("@dicebear/adventurer-neutral");
      case "avataaars":
        return await import("@dicebear/avataaars");
      case "avataaarsNeutral":
        return await import("@dicebear/avataaars-neutral");
      case "bigEars":
        return await import("@dicebear/big-ears");
      case "bigEarsNeutral":
        return await import("@dicebear/big-ears-neutral");
      case "bigSmile":
        return await import("@dicebear/big-smile");
      case "bottts":
        return await import("@dicebear/bottts");
      case "botttsNeutral":
        return await import("@dicebear/bottts-neutral");
      case "croodles":
        return await import("@dicebear/croodles");
      case "croodlesNeutral":
        return await import("@dicebear/croodles-neutral");
      case "funEmoji":
        return await import("@dicebear/fun-emoji");
      case "identicon":
        return await import("@dicebear/identicon");
      case "initials":
        return await import("@dicebear/initials");
      case "lorelei":
        return await import("@dicebear/lorelei");
      case "loreleiNeutral":
        return await import("@dicebear/lorelei-neutral");
      case "micah":
        return await import("@dicebear/micah");
      case "miniavs":
        return await import("@dicebear/miniavs");
      case "notionists":
        return await import("@dicebear/notionists");
      case "notionistsNeutral":
        return await import("@dicebear/notionists-neutral");
      case "openPeeps":
        return await import("@dicebear/open-peeps");
      case "personas":
        return await import("@dicebear/personas");
      case "pixelArt":
        return await import("@dicebear/pixel-art");
      case "pixelArtNeutral":
        return await import("@dicebear/pixel-art-neutral");
      case "rings":
        return await import("@dicebear/rings");
      case "shapes":
        return await import("@dicebear/shapes");
      case "thumbs":
        return await import("@dicebear/thumbs");
      default:
        throw new Error(`Unknown style: ${styleName}`);
    }
  } catch (error) {
    console.error(`Failed to import style ${styleName}:`, error);
    // Fallback to initials style
    return await import("@dicebear/initials");
  }
};

// Get style metadata
export const getStyleMetadata = (styleName: string) => {
  const metadata: Record<string, { title: string; description?: string }> = {
    adventurer: { title: "Adventurer" },
    adventurerNeutral: { title: "Adventurer Neutral" },
    avataaars: { title: "Avataaars" },
    avataaarsNeutral: { title: "Avataaars Neutral" },
    bigEars: { title: "Big Ears" },
    bigEarsNeutral: { title: "Big Ears Neutral" },
    bigSmile: { title: "Big Smile" },
    bottts: { title: "Bottts" },
    botttsNeutral: { title: "Bottts Neutral" },
    croodles: { title: "Croodles" },
    croodlesNeutral: { title: "Croodles Neutral" },
    funEmoji: { title: "Fun Emoji" },
    identicon: { title: "Identicon" },
    initials: { title: "Initials" },
    lorelei: { title: "Lorelei" },
    loreleiNeutral: { title: "Lorelei Neutral" },
    micah: { title: "Micah" },
    miniavs: { title: "Miniavs" },
    notionists: { title: "Notionists" },
    notionistsNeutral: { title: "Notionists Neutral" },
    openPeeps: { title: "Open Peeps" },
    personas: { title: "Personas" },
    pixelArt: { title: "Pixel Art" },
    pixelArtNeutral: { title: "Pixel Art Neutral" },
    rings: { title: "Rings" },
    shapes: { title: "Shapes" },
    thumbs: { title: "Thumbs" },
  };

  return metadata[styleName] || { title: styleName };
};
