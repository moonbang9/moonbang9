//product-query.js
// 예시
const queryList = 
`select * from product_question
where prdt_cd = ?`;

const queryListAll = 
`select * from product_question`;


const queryInfo = 
`SELECT * FROM product_question  
WHERE prdt_cd = ?`;

const queryUpdate = 
`UPDATE product_question
SET ?
WHERE qst_no = ?`;
const queryInsert =
`INSERT INTO product_question
SET ?`;
const queryDel = 
`DELETE FROM product_question
WHERE qst_no= ?`; 

const queryCount = 
`SELECT count(qst_no) as count 
FROM product_question`

const queryCount1 = 
`SELECT count(qst_no) as count 
FROM product_question
WHERE prdt_cd = ?`

module.exports = {
    queryList,
    queryInfo,
    queryUpdate,
    queryInsert,
    queryDel,
    queryListAll,
    queryCount,
    queryCount1


}