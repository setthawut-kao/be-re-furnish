import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  // 1. สร้าง JWT token โดยใช้ userId และ Secret Key ของเรา
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token มีอายุ 30 วัน
  });

  // 2. ตั้งค่า Token ให้เป็น httpOnly Cookie
  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 วัน (หน่วยเป็น ms)
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

export default generateTokenAndSetCookie;
