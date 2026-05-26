import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { navigation } from "@/configs/navigation";

const navItemClass =
  "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors";

const activeClass = "bg-primary-container text-on-primary-container font-bold";

const defaultClass = "text-on-surface-variant hover:bg-surface-container-high";

const MenuItem = ({ item, pathname }: { item: any; pathname: string }) => {
  const isActive = item.match
    ? pathname.startsWith(item.match)
    : item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      className={`${navItemClass} ${isActive ? activeClass : defaultClass}`}
    >
      <span className="material-symbols-outlined">{item.icon}</span>

      <span className="font-label-lg text-label-lg">{item.label}</span>
    </Link>
  );
};

const UserProfile = () => {
  return (
    <div className="mt-auto flex items-center gap-sm rounded-lg bg-surface-container-low p-sm">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFOXAPpn6hT9Bvdg84vbOA--QU1_qmezHXB2KPhJ6-KI1DNYhrL24s1V83RfZMPgIGeTh23V1M1fE9nAuAU9N6-VezVq-f6vqU9Ue2RURIs3euGxSX12HcQyTdBbQh0OSCY3G74avZ0T8RjsWghDqZ9qbdYvSyy7ySH8fxzpgrJIPeTEJUWnMUVb9rCvr3ClRoGubpYeDJDYl5lellrGs9rAkYKVilUILD8IrqS132nYDkElm3ZEn5jPTDoP2z3_5qRAezkb_YqW8m"
        alt="Manager"
        className="h-10 w-10 rounded-full object-cover"
      />

      <div>
        <p className="font-label-lg text-label-lg text-on-surface">
          Alex Rivera
        </p>

        <p className="text-[10px] text-on-surface-variant font-label-md">
          Manager
        </p>
      </div>
    </div>
  );
};

const SideNavBar = () => {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col gap-sm bg-surface p-md shadow-[20px_0_40px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <div className="mb-lg">
        <h1 className="font-headline-md text-headline-md font-bold text-primary">
          ScoopSoft POS
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex flex-1 flex-col gap-base">
        {navigation.map((item) => (
          <MenuItem key={item.label} item={item} pathname={pathname} />
        ))}
      </nav>

      {/* Footer */}
      <UserProfile />
    </aside>
  );
};

export default React.memo(SideNavBar);
