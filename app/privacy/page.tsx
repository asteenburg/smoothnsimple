import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Smooth n Simple",
  description:
    "Learn how Smooth n Simple protects your personal and patient information.",
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
