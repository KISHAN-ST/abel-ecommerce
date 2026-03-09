/**
 * TypeScript interfaces and classes for Product Catalog and Shopping Cart.
 * Uses interfaces for contracts, classes for behavior, inheritance, and access modifiers.
 */

/** Base entity interface for shared id across domain models */
export interface IEntity {
  id: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

/** Category class with access modifiers and encapsulation */
export class CategoryModel implements Category {
  constructor(
    public readonly id: string,
    public readonly name: string,
    private _description: string
  ) {}

  public get description(): string {
    return this._description;
  }
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  inStock: boolean;
  quantity: number;
  rating: number;
  reviews: number;
  discount?: number;
  releaseDate: Date;
}

/** Product class implementing Product interface with computed properties */
export class ProductModel implements Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly category: string,
    public readonly image: string,
    public readonly inStock: boolean,
    public readonly quantity: number,
    public readonly rating: number,
    public readonly reviews: number,
    public readonly releaseDate: Date,
    public readonly originalPrice?: number,
    public readonly discount?: number
  ) {}

  /** Computed: whether this product has a discount */
  public get hasDiscount(): boolean {
    return this.discount != null && this.discount > 0;
  }

  /** Computed: savings amount when originalPrice is set */
  public get savings(): number {
    if (this.originalPrice == null) return 0;
    return parseFloat((this.originalPrice - this.price).toFixed(2));
  }
}

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

/** CartItem class with private fields and access modifiers */
export class CartItemModel implements CartItem {
  constructor(
    public readonly product: Product,
    private _quantity: number
  ) {}

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(value: number) {
    this._quantity = Math.max(0, value);
  }

  public get subtotal(): number {
    return parseFloat((this.product.price * this.quantity).toFixed(2));
  }
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: CustomerInfo;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdDate: Date;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}
