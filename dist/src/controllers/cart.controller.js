import User from "../models/user.model.js";
export const addToCart = async (req, res) => {
  try {
    const {
      productId
    } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user.cart.includes(productId)) {
      user.cart.push(productId);
      await user.save();
    }

    // ส่งตะกร้าล่าสุดกลับไป
    await user.populate("cart");
    res.status(200).json({
      items: user.cart
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart");
    res.status(200).json({
      items: user.cart
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};
export const clearItemsFromCart = async (req, res) => {
  try {
    const {
      productIds
    } = req.body;
    const userId = req.user._id;
    if (!productIds || !Array.isArray(productIds)) {
      return res.status(400).json({
        message: "productIds must be an array."
      });
    }
    await User.findByIdAndUpdate(userId, {
      $pull: {
        cart: {
          $in: productIds
        }
      }
    });
    const user = await User.findById(userId).populate("cart");
    res.status(200).json({
      items: user.cart
    });
  } catch (error) {
    console.log("Error in clearItemsFromCart controller: ", error.message);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const {
      productId
    } = req.params;
    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, {
      $pull: {
        cart: productId
      }
    });
    const user = await User.findById(userId).populate("cart");
    res.status(200).json({
      items: user.cart
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};