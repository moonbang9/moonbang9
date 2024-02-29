//delivery.
// 예시
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
FROM delivery d JOIN orders o ON d.ord_no = o.ord_no;`;

const updateShipNo = 
`UPDATE delivery 
SET ship_no = ?
WHERE deli_no = ?`


module.exports = {
    deliveryList,
    updateShipNo
}