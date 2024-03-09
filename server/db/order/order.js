//order.js
// 주문 목록추가
const orderAdd = 
`INSERT INTO orders
SET ?`;

//회원주문 내역 조회
const orderList = 
`SELECT 
    ord_no,
    deli_addr,
    deli_addrdt,
    deli_cost,
    ord_dt,
    rcv_name,
    rcv_phone,
    rcv_email,
    status,
    total_price,
    used_point,
    total_payment,
    mem_no,
    payment_no,
    accu_pnt,
    cpn_no,
    cpn_disc,
    rcv_postcode
FROM orders
WHERE ord_no=?`;


//예시
const test = 
`select * from grade`;


// 주문 목록 출력(관리자)
const adOrderList =
`SELECT 
o.ord_no,
o.deli_addr,
o.deli_addrdt,
o.deli_cost,
o.ord_dt,
o.rcv_name,
o.rcv_phone,
o.rcv_email,
o.status,
o.total_price,
o.used_point,
o.total_payment,
o.mem_no,
o.payment_no,
o.accu_pnt,
o.cpn_no,
o.cpn_disc,
m.name
FROM member m right outer JOIN orders o 
ON m.mem_no = o.mem_no`;

// 주문수 확인(관리자)
const adOrderCount = 
`SELECT count(ord_no) as count
FROM member m  right outer JOIN orders o 
ON m.mem_no = o.mem_no`;

// 총 결제액 확인(관리자)
const adOrderTotalPayment =
`SELECT SUM(total_payment) as SUM
FROM member m  right outer JOIN orders o 
ON m.mem_no = o.mem_no`;


module.exports = {
    orderAdd,
    orderList,
    test,
    adOrderList,
    adOrderCount,
    adOrderTotalPayment
}