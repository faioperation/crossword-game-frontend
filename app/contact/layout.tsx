import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Heritage Stackers",
  description: "Get in touch with Heritage Stackers support for any questions regarding our daily mini crossword or giveaways.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
