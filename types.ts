
export enum OrderStatus {
  PENDING = 'PENDIENTE',
  PREPARING = 'PREPARANDO',
  READY = 'LISTO',
  DELIVERED = 'ENTREGADO'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  calories?: number;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  tableNumber: string;
  items: OrderItem[];
  status: OrderStatus;
  timestamp: number;
  total: number;
  paymentMethod?: string;
}

export type ViewMode = 'CUSTOMER' | 'KITCHEN' | 'SPLASH';
