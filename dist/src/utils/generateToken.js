import jwt from "jsonwebtoken";
const generateTokenAndSetCookie = (userId, res) => {
  // 1. สร้าง JWT token โดยใช้ userId และ Secret Key ของเรา
  const token = jwt.sign({
    userId
  }, process.env.JWT_SECRET, {
    expiresIn: "30d" // Token มีอายุ 30 วัน
  });

  // 2. ตั้งค่า Token ให้เป็น httpOnly Cookie
  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // 30 วัน (หน่วยเป็น ms)
    httpOnly: true,
    // ป้องกันการเข้าถึงจาก JavaScript (ป้องกัน XSS attack)
    secure: process.env.NODE_ENV !== "development",
    // ใน Production ให้ใช้ HTTPS เท่านั้น
    sameSite: "strict" // ป้องกัน CSRF attack
  });
};
export default generateTokenAndSetCookie;