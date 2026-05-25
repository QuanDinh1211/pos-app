import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="pt-24 px-lg pb-lg space-y-gutter">
        <div className="flex justify-between items-end mb-sm">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Good Morning, Alex!
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Here's what's happening at ScoopSoft today.
            </p>
          </div>
          <div className="flex gap-sm">
            <button className="px-md py-sm bg-white border border-outline-variant rounded-lg font-label-lg text-on-surface hover:bg-surface-container transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">
                calendar_today
              </span>
              Last 24 Hours
            </button>
            <button className="px-md py-sm bg-primary text-white rounded-lg font-label-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[20px]">add</span>
              New Transaction
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="bg-surface-container-lowest p-md rounded-lg soft-shadow border border-white/50 group transition-all hover:-translate-y-1">
            <div className="flex justify-between items-start mb-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary-container/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[28px]">
                  payments
                </span>
              </div>
              <span className="text-secondary font-label-md bg-secondary-container/30 px-2 py-1 rounded">
                +12.5%
              </span>
            </div>
            <p className="font-label-md text-on-surface-variant uppercase tracking-wider">
              Daily Revenue
            </p>
            <p className="font-price-display text-price-display text-on-surface mt-1">
              $2,482.50
            </p>
          </div>
          <div className="bg-surface-container-lowest p-md rounded-lg soft-shadow border border-white/50 group transition-all hover:-translate-y-1">
            <div className="flex justify-between items-start mb-sm">
              <div className="w-12 h-12 rounded-2xl bg-secondary-container/30 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[28px]">
                  shopping_bag
                </span>
              </div>
              <span className="text-secondary font-label-md bg-secondary-container/30 px-2 py-1 rounded">
                +8%
              </span>
            </div>
            <p className="font-label-md text-on-surface-variant uppercase tracking-wider">
              Total Orders
            </p>
            <p className="font-price-display text-price-display text-on-surface mt-1">
              142
            </p>
          </div>
          <div className="bg-surface-container-lowest p-md rounded-lg soft-shadow border border-white/50 group transition-all hover:-translate-y-1">
            <div className="flex justify-between items-start mb-sm">
              <div className="w-12 h-12 rounded-2xl bg-tertiary-container/30 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[28px]">
                  person_add
                </span>
              </div>
              <span className="text-primary font-label-md bg-primary-fixed/30 px-2 py-1 rounded">
                +24
              </span>
            </div>
            <p className="font-label-md text-on-surface-variant uppercase tracking-wider">
              New Customers
            </p>
            <p className="font-price-display text-price-display text-on-surface mt-1">
              38
            </p>
          </div>
          <div className="bg-surface-container-lowest p-md rounded-lg soft-shadow border border-white/50 group transition-all hover:-translate-y-1">
            <div className="flex justify-between items-start mb-sm">
              <div className="w-12 h-12 rounded-2xl bg-surface-dim/30 flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[28px]">
                  analytics
                </span>
              </div>
              <span className="text-on-surface-variant font-label-md bg-surface-variant px-2 py-1 rounded">
                -2%
              </span>
            </div>
            <p className="font-label-md text-on-surface-variant uppercase tracking-wider">
              Avg. Order Value
            </p>
            <p className="font-price-display text-price-display text-on-surface mt-1">
              $17.48
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-2 bg-white rounded-lg soft-shadow p-md border border-white/50">
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Revenue Trend
              </h3>
              <div className="flex items-center gap-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                  <span className="font-label-md text-on-surface-variant">
                    Current Week
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                  <span className="font-label-md text-on-surface-variant">
                    Previous Week
                  </span>
                </div>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-4 px-sm">
              <div className="w-full h-full relative group">
                <svg
                  className="absolute bottom-0 left-0 w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 180 Q 50 150, 100 160 T 200 100 T 300 130 T 400 60 T 500 80 T 600 40"
                    fill="none"
                    stroke="url(#gradient-pink)"
                    strokeLinecap="round"
                    strokeWidth="4"
                  ></path>
                  <defs>
                    <linearGradient
                      id="gradient-pink"
                      x1="0%"
                      x2="100%"
                      y1="0%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        style={{
                          stopColor: "#f9a8d4",
                          stopOpacity: 1,
                        }}
                      ></stop>
                      <stop
                        offset="100%"
                        style={{
                          stopColor: "#8a486f",
                          stopOpacity: 1,
                        }}
                      ></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                  <div className="w-full h-[1px] bg-on-surface"></div>
                  <div className="w-full h-[1px] bg-on-surface"></div>
                  <div className="w-full h-[1px] bg-on-surface"></div>
                  <div className="w-full h-[1px] bg-on-surface"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-sm px-sm font-label-md text-on-surface-variant">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
          <div className="bg-white rounded-lg soft-shadow p-md border border-white/50">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-lg">
              Popular Flavors
            </h3>
            <div className="relative flex justify-center items-center py-md">
              <div className="w-48 h-48 rounded-full border-[24px] border-secondary-container relative">
                <div className="absolute -top-6 -left-6 w-48 h-48 rounded-full border-[24px] border-primary-container border-t-transparent border-l-transparent -rotate-45"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-headline-md text-headline-md text-on-surface">
                    1,240
                  </p>
                  <p className="font-label-md text-on-surface-variant">
                    Total Scoops
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-sm mt-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                  <span className="font-body-md text-on-surface">
                    Strawberry Bliss
                  </span>
                </div>
                <span className="font-label-lg text-on-surface-variant">
                  42%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                  <span className="font-body-md text-on-surface">
                    Minty Fresh
                  </span>
                </div>
                <span className="font-label-lg text-on-surface-variant">
                  35%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-tertiary-container"></span>
                  <span className="font-body-md text-on-surface">
                    ClassNameic Vanilla
                  </span>
                </div>
                <span className="font-label-lg text-on-surface-variant">
                  23%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          <div className="bg-white rounded-lg soft-shadow overflow-hidden border border-white/50">
            <div className="p-md flex justify-between items-center bg-surface-container-low/50">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Recent Orders
              </h3>
              <button className="text-primary font-label-lg hover:underline">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-lowest">
                  <tr>
                    <th className="px-md py-sm font-label-lg text-on-surface-variant border-b border-outline-variant/30">
                      Order ID
                    </th>
                    <th className="px-md py-sm font-label-lg text-on-surface-variant border-b border-outline-variant/30">
                      Customer
                    </th>
                    <th className="px-md py-sm font-label-lg text-on-surface-variant border-b border-outline-variant/30">
                      Items
                    </th>
                    <th className="px-md py-sm font-label-lg text-on-surface-variant border-b border-outline-variant/30">
                      Status
                    </th>
                    <th className="px-md py-sm font-label-lg text-on-surface-variant border-b border-outline-variant/30">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr className="hover:bg-surface-container-low/30 transition-colors cursor-pointer">
                    <td className="px-md py-md font-label-lg text-on-surface">
                      #SC-1029
                    </td>
                    <td className="px-md py-md font-body-md text-on-surface">
                      Emma Watson
                    </td>
                    <td className="px-md py-md font-body-md text-on-surface-variant">
                      3 Scoops, 1 Topping
                    </td>
                    <td className="px-md py-md">
                      <span className="bg-secondary-container/50 text-secondary px-3 py-1 rounded-full text-[12px] font-bold">
                        Completed
                      </span>
                    </td>
                    <td className="px-md py-md font-label-lg text-on-surface">
                      $12.50
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/30 transition-colors cursor-pointer">
                    <td className="px-md py-md font-label-lg text-on-surface">
                      #SC-1028
                    </td>
                    <td className="px-md py-md font-body-md text-on-surface">
                      James Miller
                    </td>
                    <td className="px-md py-md font-body-md text-on-surface-variant">
                      2 Scoops, Waffle Cone
                    </td>
                    <td className="px-md py-md">
                      <span className="bg-secondary-container/50 text-secondary px-3 py-1 rounded-full text-[12px] font-bold">
                        Completed
                      </span>
                    </td>
                    <td className="px-md py-md font-label-lg text-on-surface">
                      $9.75
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/30 transition-colors cursor-pointer">
                    <td className="px-md py-md font-label-lg text-on-surface">
                      #SC-1027
                    </td>
                    <td className="px-md py-md font-body-md text-on-surface">
                      Sara Connor
                    </td>
                    <td className="px-md py-md font-body-md text-on-surface-variant">
                      Milkshake, 1 Dip
                    </td>
                    <td className="px-md py-md">
                      <span className="bg-primary-container/50 text-on-primary-container px-3 py-1 rounded-full text-[12px] font-bold">
                        In Prep
                      </span>
                    </td>
                    <td className="px-md py-md font-label-lg text-on-surface">
                      $15.20
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white rounded-lg soft-shadow p-md border border-white/50">
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Inventory Alerts
              </h3>
              <span className="bg-error-container text-on-error-container px-2 py-1 rounded font-label-md">
                3 Items Low
              </span>
            </div>
            <div className="space-y-sm">
              <div className="flex items-center justify-between p-sm rounded-lg bg-error-container/10 border border-error/10">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-lg bg-error-container/30 flex items-center justify-center text-error">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <div>
                    <p className="font-label-lg text-on-surface">
                      Rainbow Sprinkles
                    </p>
                    <p className="font-label-md text-error">
                      Critical: 250g remaining
                    </p>
                  </div>
                </div>
                <button className="px-md py-2 bg-error text-white rounded-lg font-label-md hover:opacity-90 transition-all">
                  Restock
                </button>
              </div>
              <div className="flex items-center justify-between p-sm rounded-lg bg-surface-container-low border border-outline-variant/30">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-lg bg-secondary-container/30 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">inventory</span>
                  </div>
                  <div>
                    <p className="font-label-lg text-on-surface">
                      Dark Chocolate Chips
                    </p>
                    <p className="font-label-md text-on-surface-variant">
                      Low: 1.5kg remaining
                    </p>
                  </div>
                </div>
                <button className="px-md py-2 bg-surface-container-highest text-on-surface rounded-lg font-label-md hover:bg-outline-variant/30 transition-all">
                  Manage
                </button>
              </div>
              <div className="flex items-center justify-between p-sm rounded-lg bg-surface-container-low border border-outline-variant/30">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-lg bg-secondary-container/30 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">inventory</span>
                  </div>
                  <div>
                    <p className="font-label-lg text-on-surface">
                      Waffle Cones (Large)
                    </p>
                    <p className="font-label-md text-on-surface-variant">
                      Low: 40 units remaining
                    </p>
                  </div>
                </div>
                <button className="px-md py-2 bg-surface-container-highest text-on-surface rounded-lg font-label-md hover:bg-outline-variant/30 transition-all">
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
