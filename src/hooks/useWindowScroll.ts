import { useEffect, useState } from "react";

export default function useWindowScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        setScrollY(window.pageYOffset);
        setIsScrolled(window.scrollY > 0);
      });
      return () => {
        window.removeEventListener("scroll", () => {});
      };
    }
  }, []);
  return {
    isScrolled,
    scrollY,
  };
}
