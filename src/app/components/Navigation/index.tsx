import React from "react";
import { Root, Link } from "./styled";
import { usePathname } from "next/navigation";

export const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <Root>
      <Link className={pathname === "/today" ? "active" : ""} href="/today">
        Today
      </Link>
      <Link className={pathname === "/period" ? "active" : ""} href="/period">
        Period
      </Link>
    </Root>
  );
};
