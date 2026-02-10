
import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Hamburguesa de Trufa y Champiñones',
    description: 'Carne Wagyu, champiñones salteados, alioli de trufa y queso suizo.',
    price: 18.50,
    category: 'Principales',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    id: '2',
    name: 'Ensalada de Quinoa Power',
    description: 'Col rizada fresca, quinoa orgánica, batatas asadas y aderezo de tahini.',
    price: 14.00,
    category: 'Ensaladas',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    id: '3',
    name: 'Pizza Margherita Artesanal',
    description: 'Masa de masa madre, mozzarella de búfala, albahaca fresca y tomates San Marzano.',
    price: 16.50,
    category: 'Principales',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    id: '4',
    name: 'Calamares Crujientes',
    description: 'Calamar salvaje con remoulade de hierbas y limón.',
    price: 12.00,
    category: 'Entrantes',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    id: '5',
    name: 'Cóctel Old Fashioned Clásico',
    description: 'Bourbon, amargo de angostura, terrón de azúcar y ralladura de naranja.',
    price: 13.00,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    id: '6',
    name: 'Coulant de Chocolate',
    description: 'Centro de chocolate negro fundido servido con helado de vainilla.',
    price: 9.50,
    category: 'Postres',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8622790124?auto=format&fit=crop&q=80&w=400&h=300'
  }
];

export const CATEGORIES = ['Todos', 'Entrantes', 'Principales', 'Ensaladas', 'Bebidas', 'Postres'];
