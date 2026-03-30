import type { Metadata } from "next";
import StudioClient from "./studio-client";

export const metadata: Metadata = {
  title: "Studio",
  description: "Embedded Sanity Studio for Digital A content editing.",
};

export default function StudioPage() {
  return <StudioClient />;
}
