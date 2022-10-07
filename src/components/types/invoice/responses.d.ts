export interface Invoice {
  id: number;
  line_items: LineItem[];
  user_id: number;
  payment_id: number;
  total: number;
}

export interface LineItem {
  id: number;
  invoice_id: number;
  item_type: string;
  item_id: number;
  name: string;
  price: number;
  created_at: Date;
}
