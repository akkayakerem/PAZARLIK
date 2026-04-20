import React, { createContext, ReactNode, useContext, useState } from 'react';
import { mockProducts, Product } from '../data/products';

type NewProductInput = {
  name: string;
  brand: string;
  category: string;
  price: string;
  description?: string;
  image?: any;
};

export type Offer = {
  id: string;
  productId: string;
  productName: string;
  offeredItem: string;
  extraPayment: string;
  createdAt: string;
};

type ProductsContextType = {
  products: Product[];
  offers: Offer[];
  addProduct: (newProduct: NewProductInput) => void;
  updateProduct: (id: string, updatedProduct: NewProductInput) => void;
  toggleFavorite: (id: string) => void;
  deleteProduct: (id: string) => void;
  addOffer: (offer: {
    productId: string;
    productName: string;
    offeredItem: string;
    extraPayment: string;
  }) => void;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [offers, setOffers] = useState<Offer[]>([]);

  const addProduct = (newProduct: NewProductInput) => {
    const productToAdd: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      brand: newProduct.brand,
      category: newProduct.category,
      price: newProduct.price,
      image: newProduct.image || require('../assets/images/araba.png'),
      colors: ['#000000', '#FFFFFF', '#C0C0C0'],
      isFavorite: false,
      hasAR: false,
      isMembersOnly: false,
      isUserCreated: true,
      description: newProduct.description || '',
    };

    setProducts((prev) => [productToAdd, ...prev]);
  };

  const updateProduct = (id: string, updatedProduct: NewProductInput) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              name: updatedProduct.name,
              brand: updatedProduct.brand,
              category: updatedProduct.category,
              price: updatedProduct.price,
              description: updatedProduct.description || '',
              image: updatedProduct.image || item.image,
            }
          : item
      )
    );
  };

  const toggleFavorite = (id: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const addOffer = (offer: {
    productId: string;
    productName: string;
    offeredItem: string;
    extraPayment: string;
  }) => {
    const newOffer: Offer = {
      id: Date.now().toString(),
      productId: offer.productId,
      productName: offer.productName,
      offeredItem: offer.offeredItem,
      extraPayment: offer.extraPayment,
      createdAt: new Date().toLocaleString('tr-TR'),
    };

    setOffers((prev) => [newOffer, ...prev]);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        offers,
        addProduct,
        updateProduct,
        toggleFavorite,
        deleteProduct,
        addOffer,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }

  return context;
}