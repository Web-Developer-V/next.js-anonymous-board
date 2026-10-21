"use client";

import Link from "next/link";
import BOARD_MENUS from "../../data/json/board-menus.json";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (link: string) => {
    if (link === "/") {
      return pathname === "/";
    }

    return pathname === link || pathname.startsWith(`${link}/`);
  };

  return (
    <header className="bg-white h-20 shadow-[0px_0px_5px_5px_rgba(0,0,0,0.02)]">
      <div className="flex justify-end max-w-300 w-full h-full mx-auto">
        <nav>
          <ul className="flex gap-x-5 items-center h-full">
            <li>
              <Link className={isActive("/") ? "font-bold" : undefined} href="/">
                홈
              </Link>
            </li>
            {BOARD_MENUS.map((menu) => (
              <li key={menu.id}>
                <Link className={`${isActive(`${menu.link}`) ? "font-bold" : null}`} href={menu.link}>
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
