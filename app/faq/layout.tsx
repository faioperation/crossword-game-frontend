import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Heritage Stackers",
  description: "Frequently asked questions about how to play the Heritage Stackers daily mini crossword and win authentic silver coins.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
