export default function getFirstName(name?: string | null): string {
  if (!name) {
    return "";
  }

  return name.split(" ")[0];
}
