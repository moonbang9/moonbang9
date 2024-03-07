//user.js

// 회원 전체 조회(관리자)
const userList = 
`SELECT
        mem_no,
        id,
        name,
        pwd,
        phone,
        birth_dt,
        gen,
        email,
        post_cd,
        addr,
        addrdt,
        point,
        token,
        mem_status,
        grd_no,
        used_payment
FROM    member`;

// 회원 개별 조회
const userInfo = 
`SELECT
        mem_no,
        id,
        name,
        pwd,
        phone,
        birth_dt,
        gen,
        email,
        post_cd,
        addr,
        addrdt,
        point,
        token,
        mem_status,
        grd_no,
        (select rwd_pct from grade where grd_no = member.grd_no) as rwd_pct
FROM    member
WHERE mem_no = ?`;


// 회원 로그인
const userLogin = 
`SELECT 
        COUNT(*) AS loginCheck ,
        mem_no,
        name
FROM    member 
WHERE   id = ? 
AND     pwd = ?`;

// 회원 가입
const userJoin = 
`INSERT INTO member 
SET ?`;

// 회원 정보 수정
const userUpdate = 
`UPDATE member 
 SET ?
 WHERE mem_no = ?`;

 //회원탈퇴
//const userQuit =


 //const userDelete = 
 
 // 보유 포인트 확인
 const userPoint = 
`SELECT * 
 FROM   member 
 WHERE mem_no = ?`;

 // 회원수 확인(관리자)
 const userCount = 
`SELECT count(mem_no) as count
FROM member`;

 module.exports = {
    userList,
    userInfo,
    userJoin,
    userUpdate,
    userLogin,
    userPoint,
    userCount
}