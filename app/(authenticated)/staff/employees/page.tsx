import React from "react";

const page = () => {
  return (
    <div className="pt-24 px-lg pb-lg space-y-gutter">
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
          <button className="bg-primary hover:bg-primary/90 text-white px-md py-sm rounded-full flex items-center gap-xs shadow-md active:scale-95 transition-all">
            <span className="material-symbols-outlined">add</span>
            <span className="font-label-lg text-label-lg">Thêm nhân viên</span>
          </button>
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
                <th className="px-md py-sm font-label-lg text-label-lg text-on-surface-variant text-right">
                  Hành động
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
                  <p className="font-label-md text-on-surface">0912 345 678</p>
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
                <td className="px-md py-md text-right">
                  <div className="flex justify-end gap-xs">
                    <button className="p-xs rounded-full hover:bg-surface-variant transition-colors">
                      <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                        edit
                      </span>
                    </button>
                    <button className="p-xs rounded-full hover:bg-error-container/30 transition-colors">
                      <span className="material-symbols-outlined text-error text-[20px]">
                        delete
                      </span>
                    </button>
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
                  <p className="font-label-md text-on-surface">0988 123 456</p>
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
                <td className="px-md py-md text-right">
                  <div className="flex justify-end gap-xs">
                    <button className="p-xs rounded-full hover:bg-surface-variant transition-colors">
                      <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                        edit
                      </span>
                    </button>
                    <button className="p-xs rounded-full hover:bg-error-container/30 transition-colors">
                      <span className="material-symbols-outlined text-error text-[20px]">
                        delete
                      </span>
                    </button>
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
                  <p className="font-label-md text-on-surface">0977 444 888</p>
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
                <td className="px-md py-md text-right">
                  <div className="flex justify-end gap-xs">
                    <button className="p-xs rounded-full hover:bg-surface-variant transition-colors">
                      <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                        edit
                      </span>
                    </button>
                    <button className="p-xs rounded-full hover:bg-error-container/30 transition-colors">
                      <span className="material-symbols-outlined text-error text-[20px]">
                        delete
                      </span>
                    </button>
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
  );
};

export default page;
