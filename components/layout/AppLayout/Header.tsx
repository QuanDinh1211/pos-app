import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-20 bg-surface-bright z-40 flex justify-between items-center px-lg py-md">
      <div className="flex items-center gap-md w-1/2">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface-container rounded-full border-none focus:ring-2 focus:ring-primary/20 text-body-md transition-all"
            placeholder="Search orders, flavors, or staff..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-md">
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined" data-icon="notifications">
            notifications
          </span>
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:bg-secondary-container transition-colors">
          <span className="material-symbols-outlined" data-icon="cloud_done">
            cloud_done
          </span>
        </button>
        <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
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

export default Header;
