import CreateProduct from "@/components/sections/product/Create";
import UpdateProduct from "@/components/sections/product/Update";
import React from "react";

const page = () => {
  return (
    <div className="pt-24 px-lg pb-lg space-y-gutter">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
            Quản lý sản phẩm
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            Danh sách tất cả các loại kem và đồ uống hiện có tại cửa hàng.
          </p>
        </div>
        <CreateProduct />
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-surface-container-highest">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
              Bộ lọc
            </h3>
            <div className="space-y-6">
              <div>
                <label className="font-label-lg text-label-lg text-on-surface-variant block mb-2">
                  Danh mục
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="w-6 h-6 rounded-md border-2 border-outline-variant text-secondary focus:ring-secondary"
                      type="checkbox"
                    />
                    <span className="font-body-md text-body-md group-hover:text-secondary transition-colors">
                      Tất cả
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="w-6 h-6 rounded-md border-2 border-outline-variant text-secondary focus:ring-secondary"
                      type="checkbox"
                    />
                    <span className="font-body-md text-body-md group-hover:text-secondary transition-colors">
                      Kem ly
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="w-6 h-6 rounded-md border-2 border-outline-variant text-secondary focus:ring-secondary"
                      type="checkbox"
                    />
                    <span className="font-body-md text-body-md group-hover:text-secondary transition-colors">
                      Đồ uống
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="w-6 h-6 rounded-md border-2 border-outline-variant text-secondary focus:ring-secondary"
                      type="checkbox"
                    />
                    <span className="font-body-md text-body-md group-hover:text-secondary transition-colors">
                      Topping
                    </span>
                  </label>
                </div>
              </div>
              <div className="pt-4 border-t border-outline-variant">
                <label className="font-label-lg text-label-lg text-on-surface-variant block mb-2">
                  Trạng thái
                </label>
                <select className="w-full p-3 bg-surface-container border border-outline-variant rounded-full text-body-md font-body-md focus:ring-2 focus:ring-secondary outline-none appearance-none">
                  <option>Tất cả trạng thái</option>
                  <option>Đang kinh doanh</option>
                  <option>Hết hàng</option>
                  <option>Tạm ẩn</option>
                </select>
              </div>
              <button className="w-full py-3 mt-4 border-2 border-secondary text-secondary font-label-lg rounded-full hover:bg-secondary-container/20 transition-all active:scale-[0.98]">
                Làm mới bộ lọc
              </button>
            </div>
          </div>
          <div className="bg-tertiary-container/30 p-6 rounded-lg border border-tertiary-container flex items-center justify-between">
            <div>
              <p className="text-on-tertiary-container font-label-lg">
                Tổng sản phẩm
              </p>
              <p className="text-price-display font-price-display text-on-tertiary-container">
                42
              </p>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-tertiary">
                inventory
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-9 bg-white rounded-lg shadow-sm border border-surface-container-highest overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low border-b border-surface-container-highest">
                <tr>
                  <th className="px-6 py-4 font-label-lg text-label-lg text-on-surface-variant">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-4 font-label-lg text-label-lg text-on-surface-variant">
                    Danh mục
                  </th>
                  <th className="px-6 py-4 font-label-lg text-label-lg text-on-surface-variant text-right">
                    Giá gốc
                  </th>
                  <th className="px-6 py-4 font-label-lg text-label-lg text-on-surface-variant text-center">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 font-label-lg text-label-lg text-on-surface-variant text-right">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-highest">
                <tr className="hover:bg-surface-container-lowest transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-surface-container-high overflow-hidden shadow-sm flex-shrink-0">
                        <img
                          alt="Strawberry ClassNameic"
                          className="w-full h-full object-cover"
                          data-alt="A macro shot of a creamy pastel pink strawberry ice cream scoop sitting perfectly in a soft tan waffle cone. The background is a clean, minimalist white countertop with gentle warm lighting, emphasizing a high-end dessert boutique aesthetic. Subtle pink and mint green tones are present in the surrounding decor, creating a sweet and professional mood."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE9My5HRVn-KotoUGP2KJG--T00tjtz5QmzGoOINhrvfb-fF6flyOy2-d-RNmSZ7m4-nj6VJBxCZy50jMrTtbvafTvlnTGXmhpE-yu63TTj5YShgTk6EQBHhoDjJnAqaXGDetE7upod8jIGreQNzGF3550AxXsJWD0xp4qovtsq9_WBK3bfrJz1sURJyfO8AUnJV_-UVFKEeIoVBiNcfhOX_yWqmqlfg-8Cf6aE7VwCs_ALU1JFhIkJlyltFBVX4_wqdm7gLiimJkB"
                        />
                      </div>
                      <div>
                        <p className="font-headline-md text-on-surface leading-tight">
                          Dâu tây cổ điển
                        </p>
                        <p className="text-label-md text-on-surface-variant">
                          Mã: IC-001
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-primary-container/30 text-on-primary-container rounded-full text-label-md font-label-md">
                      Kem ly
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-price-display text-on-surface text-[18px]">
                      45.000đ
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary-container/40 text-secondary rounded-full text-label-md font-label-md">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      Sẵn sàng
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <UpdateProduct />
                      <button className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-full transition-all">
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-surface-container-high overflow-hidden shadow-sm flex-shrink-0">
                        <img
                          alt="Mint Choco"
                          className="w-full h-full object-cover"
                          data-alt="A luscious mint chocolate chip ice cream scoop presented in a premium glass dish. The vibrant mint green color is contrasted by dark chocolate flecks. The scene is lit by soft, bright daylight coming from a side window, reflecting off the smooth, rounded surface of the ice cream and creating a fresh, cheerful, and appetizing atmosphere."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6OiHvwK1na4D7PU3b0ZvUQ0Nteu3iNMOSdb4nDLg0ZEdSfPSC9NISc1WAHXZkLWFOc9RZKYEQ7bRVfDKxsPgtXzlJaY5n-gK4pZ6050nVQLO8KwVh8XkBc2Sx_nStxoUf8DOpNM4DhVU1vhKwXL3ekVsKJ97vnyCqS3TZsgra7btArSagb49O10z7Mg1CH-WfjXrbbvrU3zvcn1EnMijHBVp_s6F2_uHoXQ2jzDMY9PAFRjSBLg_YvF0m5giR82kjtNEI6cr6bw_6"
                        />
                      </div>
                      <div>
                        <p className="font-headline-md text-on-surface leading-tight">
                          Bạc hà Chocolate
                        </p>
                        <p className="text-label-md text-on-surface-variant">
                          Mã: IC-004
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-primary-container/30 text-on-primary-container rounded-full text-label-md font-label-md">
                      Kem ly
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-price-display text-on-surface text-[18px]">
                      45.000đ
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary-container/40 text-secondary rounded-full text-label-md font-label-md">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      Sẵn sàng
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-on-surface-variant hover:text-secondary hover:bg-secondary-container/20 rounded-full transition-all">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-full transition-all">
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-surface-container-high overflow-hidden shadow-sm flex-shrink-0">
                        <img
                          alt="Iced Latte"
                          className="w-full h-full object-cover"
                          data-alt="A tall iced latte in a minimalist glass with perfectly layered coffee and creamy white milk. Condensation beads on the outside of the glass, suggesting a chilled temperature. The background features soft pastel pink walls and a bright, clean table surface, embodying a modern and airy cafe design language."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe_ZbGsQ7hI9hoxeciu2fChRdWnePcG8oSsvQmHD_nr07OSjnVn43mi47R-A2FmPgQBqu782o2kK_HuHJ5ULdswox30DLd2MWoaRSCmwC01ifqtssmFzbRYhI4BuinYzm_IhWIWTYzXqblB9FMGXvCXltYn0VmVw_aYlQCigKfHW7VewFenrodaIkEJW1PZv7HLAKv1WDVaywINI5rU6N5APRshAjsOlXWXS-hol1MsfbLZwD2D6pbBAZf5XisPuc_DbZHtJmeJlny"
                        />
                      </div>
                      <div>
                        <p className="font-headline-md text-on-surface leading-tight">
                          Latte đá viên
                        </p>
                        <p className="text-label-md text-on-surface-variant">
                          Mã: DR-002
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-label-md font-label-md">
                      Đồ uống
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-price-display text-on-surface text-[18px]">
                      55.000đ
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-error-container/40 text-error rounded-full text-label-md font-label-md">
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                      Hết hàng
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-on-surface-variant hover:text-secondary hover:bg-secondary-container/20 rounded-full transition-all">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-full transition-all">
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-surface-container-high overflow-hidden shadow-sm flex-shrink-0">
                        <img
                          alt="Rainbow Sprinkles"
                          className="w-full h-full object-cover"
                          data-alt="Colorful, glossy candy sprinkles spilled artistically onto a clean pastel pink surface. The lighting is soft and flat, emphasizing the variety of bright colors like blue, yellow, and red. The aesthetic is playful and minimalist, capturing the essence of ice cream toppings in a modern, professional manner."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7qrNFzcRAkBZ1A4lryuqW4_6hqALnBVsdWM1D_UxecJ5sZ58X3Bmqc9Ji3YJKF-ZWYXm2hXBVG2Zi7S3EAU3qVckqzlkVR8aH3GUqmYkrneUcj5LoeBFMbmGHhw2OHRowhwXeamLxQNzpaIhs3La912BTAHGRAPpex3Fgh1eDXyqrDFqgkBrfmVuQ9bPwuJnPPGDXYiico_Zu0ZOqp-vEAWq4G5WQjfjHxaFUUnufXIHwiblwIhpLqMDoWkBaEW97_h-sbVKFimYJ"
                        />
                      </div>
                      <div>
                        <p className="font-headline-md text-on-surface leading-tight">
                          Cốm cầu vồng
                        </p>
                        <p className="text-label-md text-on-surface-variant">
                          Mã: TP-015
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-tertiary-container/30 text-on-tertiary-container rounded-full text-label-md font-label-md">
                      Topping
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-price-display text-on-surface text-[18px]">
                      10.000đ
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-outline-variant/30 text-on-surface-variant rounded-full text-label-md font-label-md">
                      <span className="w-2 h-2 rounded-full bg-outline"></span>
                      Tạm ẩn
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-on-surface-variant hover:text-secondary hover:bg-secondary-container/20 rounded-full transition-all">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-full transition-all">
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-surface-container-low border-t border-surface-container-highest flex items-center justify-between">
            <span className="text-label-lg text-on-surface-variant">
              Đang hiển thị 4 trong số 42 sản phẩm
            </span>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors disabled:opacity-50">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary font-label-lg">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant font-label-lg">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant font-label-lg">
                3
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
