import React, { createContext, useContext, useState } from 'react';

type CartContextType = {
    cartItems: Record<string, number>;
    handleIncrement: (id: string) => void;
    handleDecrement: (id: string) => void;
    resetCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<Record<string, number>>({});

    const handleIncrement = (id: string) => {
        setCartItems(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };

    const handleDecrement = (id: string) => {
        setCartItems(prev => {
            const currentQuantity = prev[id] || 0;
            if (currentQuantity <= 1) {
                const newCart = { ...prev };
                delete newCart[id];
                return newCart;
            }
            return { ...prev, [id]: currentQuantity - 1 };
        });
    };

    const resetCart= () => {
        setCartItems({});
    };

    return (
        <CartContext.Provider value={{ cartItems, handleIncrement, handleDecrement,resetCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};