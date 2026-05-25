import React from "react";

const SideNavBar = () => {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col p-md gap-sm bg-surface shadow-[20px_0_40px_rgba(0,0,0,0.05)] z-50">
      <div className="mb-lg">
        <h1 className="font-headline-md text-headline-md text-primary font-bold">
          ScoopSoft POS
        </h1>
        <p className="font-label-md text-on-surface-variant">
          Sweet Station #1
        </p>
      </div>
      <nav className="flex flex-col gap-base flex-1">
        <a
          className="flex items-center gap-3 bg-secondary-container text-on-secondary-container rounded-lg px-4 py-3 scale-[0.98] transition-all"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="dashboard">
            dashboard
          </span>
          <span className="font-label-lg text-label-lg">Dashboard</span>
        </a>
        <a
          className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg px-4 py-3 transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="point_of_sale">
            point_of_sale
          </span>
          <span className="font-label-lg text-label-lg">POS</span>
        </a>
        <a
          className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg px-4 py-3 transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="ice_cream">
            icecream
          </span>
          <span className="font-label-lg text-label-lg">Products</span>
        </a>
        <a
          className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg px-4 py-3 transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="inventory_2">
            inventory_2
          </span>
          <span className="font-label-lg text-label-lg">Inventory</span>
        </a>
        <a
          className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg px-4 py-3 transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="analytics">
            analytics
          </span>
          <span className="font-label-lg text-label-lg">Reports</span>
        </a>
        <a
          className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg px-4 py-3 transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="settings">
            settings
          </span>
          <span className="font-label-lg text-label-lg">Settings</span>
        </a>
      </nav>
      <div className="mt-auto flex items-center gap-sm p-sm bg-surface-container-low rounded-lg">
        <img
          alt="Store Manager Profile"
          className="w-10 h-10 rounded-full object-cover"
          data-alt="A professional portrait of a store manager in a brightly lit modern office setting. She has a friendly, welcoming expression and is wearing casual business attire. The environment is clean and airy with pastel color accents that match a premium ice cream parlor brand aesthetic."
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFOXAPpn6hT9Bvdg84vbOA--QU1_qmezHXB2KPhJ6-KI1DNYhrL24s1V83RfZMPgIGeTh23V1M1fE9nAuAU9N6-VezVq-f6vqU9Ue2RURIs3euGxSX12HcQyTdBbQh0OSCY3G74avZ0T8RjsWghDqZ9qbdYvSyy7ySH8fxzpgrJIPeTEJUWnMUVb9rCvr3ClRoGubpYeDJDYl5lellrGs9rAkYKVilUILD8IrqS132nYDkElm3ZEn5jPTDoP2z3_5qRAezkb_YqW8m"
        />
        <div>
          <p className="font-label-lg text-label-lg text-on-surface">
            Alex Rivera
          </p>
          <p className="font-label-md text-on-surface-variant text-[10px]">
            Manager
          </p>
        </div>
      </div>
    </aside>
  );
};

export default SideNavBar;
