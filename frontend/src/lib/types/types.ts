export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image?: {
    url: string;
    publicId: string | null;
  };
  views: number;
  stock: number;
  category: string;
  discount: number;
  priceAfterDiscount: number;
  sales: number;
  salesLast24h: number;
  salesHistory: Array<{
    date: Date;
    count: number;
  }>;
};

export type Category = {
  _id: string;
  title: string;
  image?: {
    url: string;
    publicId: string | null;
  };
};

export type ProductCart = {
  product: Product;
  quantity: number;
};

export type Cart = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  products: ProductCart[];
  totalPrice: number;
};

export type Review = {
  _id: string;
  image: {
    url: string;
    publicId: string;
  };
};
