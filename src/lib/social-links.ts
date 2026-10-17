import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { SiLinktree } from "react-icons/si";

export const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/jym_rajajinagar/",
    label: "@jym_rajajinagar",
    icon: FaInstagram,
    color: "#C13584",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61595478030947",
    label: "Jineshwar Yuva Mandal",
    icon: FaFacebookF,
    color: "#1877F2",
  },
  {
    name: "Linktree",
    href: "https://linktr.ee/jym.rajajinagar",
    label: "All our links",
    icon: SiLinktree,
    color: "#43E55E",
  },
] as const;