//delivery.
// 배송 목록
const deliveryList = 
`SELECT
d.deli_no as deli_no
,d.ord_no as ord_no
,o.ord_dt  as ord_dt
,d.status as status
,concat(o.deli_addr, o.deli_addrdt) as fulladdr 
,d.ship_no as ship_no
,d.ship_comp as ship_comp
,o.total_price as total_price
,d.arr_dt as arr_dt
FROM delivery d JOIN orders o ON d.ord_no = o.ord_no`;

//배송 수정
const updateShipNo = 
`UPDATE delivery 
SET status = ?
WHERE deli_no = ?`

//페이징 용 수량카운트
const deliveryCount = 
`SELECT count(deli_no) as count 
FROM delivery`;

// 배송 추가
const insertDelivery = 
`INSERT INTO delivery
SET ?`;


module.exports = {
    deliveryList,
    updateShipNo,
    deliveryCount,
    insertDelivery
}