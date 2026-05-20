USE icecream_pos;


-- PERMISSIONS (FULL SYSTEM)
INSERT INTO permission (code, name) VALUES
('product.view', 'Xem sản phẩm'),
('product.create', 'Tạo sản phẩm'),
('product.update', 'Cập nhật sản phẩm'),
('product.delete', 'Xóa sản phẩm'),

('order.view', 'Xem đơn hàng'),
('order.create', 'Tạo đơn hàng'),
('order.cancel', 'Hủy đơn hàng'),
('order.refund', 'Hoàn tiền'),

('inventory.view', 'Xem kho'),
('inventory.import', 'Nhập kho'),
('inventory.export', 'Xuất kho'),
('inventory.adjust', 'Điều chỉnh kho'),
('inventory.log', 'Xem lịch sử kho'),

('user.manage', 'Quản lý người dùng'),

('report.view', 'Xem báo cáo'),
('report.sales', 'Doanh thu'),
('report.products', 'Sản phẩm'),
('report.inventory', 'Kho'),
('report.profit', 'Lợi nhuận');



-- ROLES
INSERT INTO role (code, name) VALUES
('ADMIN', 'Quản trị hệ thống'),
('MANAGER', 'Quản lý cửa hàng'),
('CASHIER', 'Thu ngân'),
('WAREHOUSE', 'Quản lý kho hàng');



-- ROLE → PERMISSION
INSERT INTO rolepermission (role_id, permission_id)
SELECT r.id, p.id
FROM role r
JOIN permission p
WHERE r.code = 'ADMIN';

INSERT INTO rolepermission (role_id, permission_id)
SELECT r.id, p.id
FROM role r
JOIN permission p ON p.code IN (
  'product.view',
  'product.create',
  'product.update',

  'order.view',
  'order.create',
  'order.cancel',

  'inventory.view',
  'inventory.adjust',

  'report.view',
  'report.sales',
  'report.products',
  'report.inventory'
)
WHERE r.code = 'MANAGER';

INSERT INTO rolepermission (role_id, permission_id)
SELECT r.id, p.id
FROM role r
JOIN permission p ON p.code IN (
  'product.view',
  'order.view',
  'order.create'
)
WHERE r.code = 'CASHIER';

INSERT INTO rolepermission (role_id, permission_id)
SELECT r.id, p.id
FROM role r
JOIN permission p ON p.code IN (
  'inventory.view',
  'inventory.import',
  'inventory.export',
  'inventory.adjust',
  'inventory.log'
)
WHERE r.code = 'WAREHOUSE';


-- TẠO 4 USER
INSERT INTO user (name, username, email, password, roleId, status, createdAt)
SELECT 'Admin','admin','admin@icecream.local','123',r.id,1,NOW()
FROM role r WHERE r.code='ADMIN';

INSERT INTO user (name, username, email, password, roleId, status, createdAt)
SELECT 'Manager','manager','manager@icecream.local','123',r.id,1,NOW()
FROM role r WHERE r.code='MANAGER';

INSERT INTO user (name, username, email, password, roleId, status, createdAt)
SELECT 'Cashier','cashier','cashier@icecream.local','123',r.id,1,NOW()
FROM role r WHERE r.code='CASHIER';

INSERT INTO user (name, username, email, password, roleId, status, createdAt)
SELECT 'Warehouse','warehouse','warehouse@icecream.local','123',r.id,1,NOW()
FROM role r WHERE r.code='WAREHOUSE';