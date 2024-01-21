import type { Metadata } from "next";
import { SkeletonTheme } from "react-loading-skeleton";
import "@rfviolato/private-registry/font-awesome-5/css/fontawesome.min.css";
import "@rfviolato/private-registry/font-awesome-5/css/solid.min.css";
import "@rfviolato/private-registry/font-awesome-5/css/regular.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";

// fonts
import "typeface-roboto";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SkeletonTheme highlightColor="#b9b9b9">{children}</SkeletonTheme>
      </body>
    </html>
  );
}
