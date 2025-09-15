import rateLimit from "express-rate-limit";

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 นาที
  max: 100, // ปกติ: 100 req/IP
  message: "Too many requests, please try again later.",
});

const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 นาที
  max: 5, // route sensitive เช่น login/signup
  message: "Too many login attempts, please try again later.",
});

export { generalLimiter, authLimiter };
