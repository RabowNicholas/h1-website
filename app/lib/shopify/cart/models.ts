interface AddCartLineItem {
  variantId: string;
  quantity: number;
}

interface UpdateCartLineItem {
  lineId: string;
  quantity: number;
}

interface Cart {
  id: string;
  totalQuantity: number;
  checkoutUrl: string;
  items: CartLine[];
  subtotal: number;
}

interface CartLine {
  lineId: string;
  itemId: string;
  quantity: string;
  costPerItem: string;
  subtotalItem: string;
  name: string;
}
