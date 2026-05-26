"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { navigation } from "@/configs/navigation";

const Header = () => {
  const pathname = usePathname();

  const currentPage = navigation.find((item) =>
    item.match
      ? pathname.startsWith(item.match)
      : item.href === "/"
        ? pathname === "/"
        : pathname.startsWith(item.href),
  );

  return (
    <header className="fixed right-0 top-0 z-40 flex h-20 w-[calc(100%-16rem)] items-center justify-between bg-surface-bright px-lg py-md">
      {/* Left */}
      <div className="flex items-center gap-lg">
        {/* Title */}
        <h2 className="text-headline-md font-headline-md font-bold text-primary">
          {currentPage?.title}
        </h2>

        {/* Tabs */}
        {currentPage?.tabs && (
          <nav className="flex gap-md">
            {currentPage.tabs.map((tab) => {
              const isActive = pathname === tab.href;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`
                    text-label-lg font-label-lg transition-colors
                    ${
                      isActive
                        ? "border-b-2 border-primary font-bold text-primary"
                        : "text-on-surface-variant hover:text-primary"
                    }
                  `}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-md">
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <div className="mx-2 h-8 w-[1px] bg-outline-variant"></div>

        <div className="flex items-center gap-sm">
          <span className="font-label-lg text-label-lg text-on-surface">
            Store #1
          </span>

          <span className="material-symbols-outlined text-primary">
            storefront
          </span>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
