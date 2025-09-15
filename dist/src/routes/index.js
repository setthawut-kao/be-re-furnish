import authRouter from "./auth.routes.js";
import productRouter from "./product.routes.js";
import orderRouter from "./order.routes.js";
import cartRouter from "./cart.routes.js";
const allRoutes = {
  authRouter,
  productRouter,
  orderRouter,
  cartRouter
};
export default allRoutes;