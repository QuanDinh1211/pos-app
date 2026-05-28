import React from "react";

const page = () => {
  return (
    <div className="pt-24 px-lg pb-lg space-y-gutter">
      <div className="p-gutter flex flex-col xl:flex-row gap-gutter">
        <div className="flex-1 space-y-gutter">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
            <div className="bg-white p-md rounded-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start">
                <div className="p-sm rounded-full bg-primary-container text-on-primary-container">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/30 group-hover:text-primary transition-colors">
                  trending_up
                </span>
              </div>
              <div className="mt-md">
                <p className="font-label-lg text-label-lg text-on-surface-variant">
                  Tổng nhân sự
                </p>
                <h2 className="font-display-lg text-display-lg text-on-surface leading-none">
                  12
                </h2>
              </div>
            </div>
            <div className="bg-white p-md rounded-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start">
                <div className="p-sm rounded-full bg-secondary-container text-on-secondary-container">
                  <span className="material-symbols-outlined">timer</span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/30 group-hover:text-secondary transition-colors">
                  radio_button_checked
                </span>
              </div>
              <div className="mt-md">
                <p className="font-label-lg text-label-lg text-on-surface-variant">
                  Đang làm việc
                </p>
                <h2 className="font-display-lg text-display-lg text-on-surface leading-none">
                  04
                </h2>
              </div>
            </div>
            <div className="bg-white p-md rounded-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start">
                <div className="p-sm rounded-full bg-tertiary-container text-on-tertiary-container">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div className="w-12 h-1 bg-surface-variant rounded-full overflow-hidden self-center">
                  <div className="bg-tertiary h-full w-[98%]"></div>
                </div>
              </div>
              <div className="mt-md">
                <p className="font-label-lg text-label-lg text-on-surface-variant">
                  Tỉ lệ chuyên cần
                </p>
                <h2 className="font-display-lg text-display-lg text-on-surface leading-none">
                  98%
                </h2>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
            <div className="p-md flex justify-between items-center border-b border-outline-variant/30">
              <div>
                <h3 className="font-headline-md text-headline-md">
                  Danh sách nhân viên
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Quản lý thông tin và phân quyền nhân sự
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low border-b border-outline-variant/30">
                  <tr>
                    <th className="px-md py-sm font-label-lg text-label-lg text-on-surface-variant">
                      Nhân viên
                    </th>
                    <th className="px-md py-sm font-label-lg text-label-lg text-on-surface-variant">
                      Vai trò
                    </th>
                    <th className="px-md py-sm font-label-lg text-label-lg text-on-surface-variant">
                      Liên hệ
                    </th>
                    <th className="px-md py-sm font-label-lg text-label-lg text-on-surface-variant">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="px-md py-md">
                      <div className="flex items-center gap-sm">
                        <img
                          alt="Minh Hoang"
                          className="w-10 h-10 rounded-full object-cover"
                          data-alt="A portrait of a male server with a bright, enthusiastic smile, wearing a pink uniform t-shirt with a small ice cream logo. The background is a soft-focus interior of a modern ice cream parlor with warm, sunlit pastel tones."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz_F3lZ5KbAD48gvS58k-bk7x5tVJcA6Bp6Wkhc8sn0hdxuOUj_L-STfpHGLDqv92zhZkSg1ng4Sg0_9jcbBdHgBuid8ANBrD5skldeh8p-z7C9gyzgzm1Pd5ADqW3BDF61ztiEzBuxXm3ZoKyC6fCc6PghNXUHkCFn2OOK_mrAXath54Utcl-1ZHpzCwSFexSesZllfVCqqABS5tvrtMh0dZGy0Ddb97iJba8HkobzRbzbeXkZ07_k4OkRJtjQibJ1NeIBTHoakuF"
                        />
                        <div>
                          <p className="font-body-md font-bold text-on-surface">
                            Lê Minh Hoàng
                          </p>
                          <p className="font-label-md text-on-surface-variant">
                            ID: SS-001
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-md py-md">
                      <span className="px-sm py-xs rounded-full bg-secondary-container text-on-secondary-container text-label-md font-bold">
                        Quản lý
                      </span>
                    </td>
                    <td className="px-md py-md">
                      <p className="font-label-md text-on-surface">
                        0912 345 678
                      </p>
                      <p className="font-label-md text-on-surface-variant">
                        hoang.lm@scoop.vn
                      </p>
                    </td>
                    <td className="px-md py-md">
                      <div className="flex items-center gap-xs">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                        <span className="font-label-md text-secondary font-bold">
                          Đang làm
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="px-md py-md">
                      <div className="flex items-center gap-sm">
                        <img
                          alt="Thu Ha"
                          className="w-10 h-10 rounded-full object-cover"
                          data-alt="A portrait of a cheerful female cashier in a stylish, light green polo shirt. Her hair is tied back professionally, and she has a helpful, warm expression. The scene is brightly lit with high-key lighting consistent with a high-end retail environment."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeP0k1OiJybiQVrXpkBAJV0d6hEMV8_DAiqTOS2f9nHZbVQEFSEv1JqB6E5aUWaBX1zQVXJl62Qn5FA8sxagYrpi1U_yT5IlazQmnFFWa7H40qGKHDOL6W-HP0U2au_CEzh5yH6JK40BIYaWN2atQSJnKJlMc9avJv58D7unvm-3DjlzHT9Sqr21U1Ed9k6t9TpwU_Wb1NsUNt8uA81hCaytkbaNQiymI_rNJaDgwJDSJAhMvVd_R3qr3d1t30JgmIZffmv4wYlVTL"
                        />
                        <div>
                          <p className="font-body-md font-bold text-on-surface">
                            Nguyễn Thu Hà
                          </p>
                          <p className="font-label-md text-on-surface-variant">
                            ID: SS-002
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-md py-md">
                      <span className="px-sm py-xs rounded-full bg-primary-container text-on-primary-container text-label-md font-bold">
                        Thu ngân
                      </span>
                    </td>
                    <td className="px-md py-md">
                      <p className="font-label-md text-on-surface">
                        0988 123 456
                      </p>
                      <p className="font-label-md text-on-surface-variant">
                        ha.nt@scoop.vn
                      </p>
                    </td>
                    <td className="px-md py-md">
                      <div className="flex items-center gap-xs">
                        <span className="w-2 h-2 rounded-full bg-outline"></span>
                        <span className="font-label-md text-outline font-bold">
                          Ngoại tuyến
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="px-md py-md">
                      <div className="flex items-center gap-sm">
                        <img
                          alt="Tran Vu"
                          className="w-10 h-10 rounded-full object-cover"
                          data-alt="A portrait of a male staff member in a soft mint green apron, holding a silver ice cream scoop. He has a friendly and casual look, set against a background of white tile and pastel pink accents, representing the modern aesthetic of Scoop &amp; Scale."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPpzNaui-xPWx3KMIwMS6cahU6kR-98S2Nx2M-A9Z713S7gOjKcOQLKALZ8_N7m05oQGEe92RismJU6SYMddRTpA1A-632_6YOPTfuAR_8KGup4i83zexMUJ9O4-eBAa7YyxyqqYygjkrkJkS0mF86OLaq-OBP21L1q1L1Qd6JLVGxhhM3J60R_H5QLqnLh_Cqmm-pA5G3qj0lnY0EF1uxTV-WJ6-anux5FZ6Ylt8uu-KQeFaYe8wISOFeQbpbLrqcyaTLU7lfOj-V"
                        />
                        <div>
                          <p className="font-body-md font-bold text-on-surface">
                            Trần Văn Vũ
                          </p>
                          <p className="font-label-md text-on-surface-variant">
                            ID: SS-005
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-md py-md">
                      <span className="px-sm py-xs rounded-full bg-tertiary-container text-on-tertiary-container text-label-md font-bold">
                        Phục vụ
                      </span>
                    </td>
                    <td className="px-md py-md">
                      <p className="font-label-md text-on-surface">
                        0977 444 888
                      </p>
                      <p className="font-label-md text-on-surface-variant">
                        vu.tv@scoop.vn
                      </p>
                    </td>
                    <td className="px-md py-md">
                      <div className="flex items-center gap-xs">
                        <span className="w-2 h-2 rounded-full bg-error"></span>
                        <span className="font-label-md text-error font-bold">
                          Nghỉ phép
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-sm bg-surface-container-low flex justify-center border-t border-outline-variant/30">
              <button className="text-primary font-label-lg text-label-lg hover:underline transition-all">
                Xem tất cả 12 nhân viên
              </button>
            </div>
          </div>
        </div>
        <aside className="w-full xl:w-80 space-y-gutter">
          <div className="bg-surface-container-high rounded-lg p-md border border-outline-variant/30 shadow-sm">
            <div className="flex justify-between items-center mb-md">
              <h4 className="font-headline-md text-headline-md leading-tight">
                Nhân sự đang làm việc
              </h4>
              <span className="bg-secondary text-white w-6 h-6 flex items-center justify-center rounded-full text-[12px] font-bold">
                4
              </span>
            </div>
            <div className="space-y-sm">
              <div className="flex items-center gap-sm p-sm bg-white rounded-lg shadow-sm">
                <div className="relative">
                  <img
                    alt="Staff"
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnIwnJQ9jza629fY-5r5U8DGPsVDzLKUrcZeG1s_xjkl5Zah5ZT4pdy9WMu4_gqZ3YplPGG46ok4SISRkSqPYElSLHQlzDFEtpzarqoEat6MLfFGU-ZrYRW9vgKlMfTY5eSLT1esevfM7XbE5hlV9oaE0STW1yPnKAGs9r8kOS9ioouWwSuZN-jQtKIqL0NsdR5GC22o8myCAWeNvccqjXVcKwSc_uTsd7katgJfQaxAhn0a94UFKbnlepgxn5IWxTAXqrrgABVdR5"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="font-body-md font-bold text-on-surface leading-tight">
                    Lê Minh Hoàng
                  </p>
                  <p className="font-label-md text-secondary">08:00 - 17:00</p>
                </div>
                <div className="text-right">
                  <p className="font-label-md text-on-surface-variant">
                    Ca sáng
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-sm p-sm bg-white rounded-lg shadow-sm">
                <div className="relative">
                  <img
                    alt="Bich Phuong"
                    className="w-12 h-12 rounded-full object-cover"
                    data-alt="A smiling female staff member in a pastel pink ice cream shop uniform. She is working at a bright counter with colorful toppings in the background. High-key lighting and a soft bokeh effect highlight her friendly presence in the shop."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoKjPfREQmgj0Mg4M2MOd-7twhjEgULHAZqBlkW-pVpBflzb9GMU7x9bZdY7Oqna6Yju3dAiXIW1LR7ry2TBIXLAL7hPkZLAY93hv_Mz7qbbVw9QnSKtJimX0vg57VJk6loghj0wqPFOctY6T8dJEksabBhalD2lZquOBO0-OKzrXRpDbgKKGJxj1i9jSJgWZ8fKhjPLhEY78kThLQ4deDP2JwpQu9zhlBZOc9jKT58pSd5Mi_qbO9Zg1No_6vSlpREOQKTXPpuJ_f"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="font-body-md font-bold text-on-surface leading-tight">
                    Phạm Bích Phương
                  </p>
                  <p className="font-label-md text-secondary">08:00 - 17:00</p>
                </div>
                <div className="text-right">
                  <p className="font-label-md text-on-surface-variant">
                    Ca sáng
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-sm p-sm bg-white rounded-lg shadow-sm opacity-80">
                <div className="relative">
                  <img
                    alt="Tuan Kiet"
                    className="w-12 h-12 rounded-full object-cover"
                    data-alt="A portrait of a male server with a short, tidy haircut wearing a mint green polo shirt. He is standing in a brightly lit, clean service area. The soft lighting and professional presentation align with the approachable SaaS-inspired POS aesthetic."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_jjIDaWVkVEaPXB3hfWMwdCaS9M6sDhlUlocIP_mNqa1yP9GQ4rd8r-5X8fPxPx9Fw9Z23Tuk1sTKIHy5Ys8ZZYwt_PX6gd3sgvvkQlRpk3hqIicLRKg7wqDz8ENR9ZUB_u1nV0YksLiS-qVfTHSOJAaDzac3gs_JqSLG5BIchE39hq1M8xfe3XfZp4W8dpl-y_E6LZ5jsezjEu9C4fWRiHcuwjf4qs5uk5avUTF5a7w4KGC-EcGbOD391z-q0qfv6Qt-SisJqXdy"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="font-body-md font-bold text-on-surface leading-tight">
                    Đặng Tuấn Kiệt
                  </p>
                  <p className="font-label-md text-secondary">10:00 - 19:00</p>
                </div>
                <div className="text-right">
                  <p className="font-label-md text-on-surface-variant">
                    Ca gãy
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-sm p-sm bg-white rounded-lg shadow-sm opacity-80">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                    ML
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="font-body-md font-bold text-on-surface leading-tight">
                    Mai Lan
                  </p>
                  <p className="font-label-md text-secondary">10:00 - 19:00</p>
                </div>
                <div className="text-right">
                  <p className="font-label-md text-on-surface-variant">
                    Ca gãy
                  </p>
                </div>
              </div>
            </div>
            <button className="w-full mt-md py-sm border-2 border-dashed border-outline-variant rounded-lg text-on-surface-variant font-label-lg hover:border-primary hover:text-primary transition-all">
              Xem lịch trình chi tiết
            </button>
          </div>
          <div className="bg-tertiary-container/20 rounded-lg p-md border border-tertiary-container relative overflow-hidden">
            <div className="absolute top-0 right-0 p-sm opacity-10">
              <span className="material-symbols-outlined text-[64px]">
                event_note
              </span>
            </div>
            <h5 className="font-label-lg text-label-lg text-on-tertiary-container font-bold mb-xs">
              Ghi chú hôm nay
            </h5>
            <p className="font-body-md text-body-md text-on-tertiary-container leading-snug">
              Kiểm tra bàn giao ca cho nhóm tối. Cần bổ sung 1 nhân sự cho sự
              kiện cuối tuần tại chi nhánh.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default page;
