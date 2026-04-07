// utils/sanitizeCartItem.ts
export const sanitizeCartItem = (item: any, quantity = 1) => ({
  id: item.id,
  title: item.title,
  description: item.description || "",
  price: Number(item.price) || 0,
  quantity: Number(quantity) || 1,
  image: item.image || "",
});
