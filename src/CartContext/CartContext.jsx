import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart должен использоваться внутри CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка корзины из PHP API при монтировании
  useEffect(() => {
    loadCart();
  }, []);

  // Загрузить корзину с сервера
  const loadCart = async () => {
    try {
      const response = await fetch('/api/cart_action.php', {
        credentials: 'include' // Важно для передачи cookies с session_id
      });
      console.log(await response)
      const data = await response.json();
      
      if (data.success) {
        setCartItems(data.cart || []);
      }
    } catch (error) {
      console.error('Ошибка загрузки корзины:', error);
    } finally {
      setLoading(false);
    }
  };

  // Добавить товар в корзину
  const addToCart = async (product) => {
    try {
      const response = await fetch('/api/cart_action.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Обновляем локальное состояние
        setCartItems((prevItems) => {
          const existingItem = prevItems.find(
            (item) => item.product_id === product.id
          );
          
          if (existingItem) {
            return prevItems.map((item) =>
              item.product_id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          
          return [
            ...prevItems,
            {
              product_id: product.id,
              quantity: 1,
              name: product.name,
              price: product.price,
              image: product.image
            }
          ];
        });
      }
    } catch (error) {
      console.error('Ошибка добавления товара:', error);
    }
  };

  // Обновить количество товара
  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch('/api/cart_action.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (quantity <= 0) {
          setCartItems((prevItems) =>
            prevItems.filter((item) => item.product_id !== productId)
          );
        } else {
          setCartItems((prevItems) =>
            prevItems.map((item) =>
              item.product_id === productId
                ? { ...item, quantity: quantity }
                : item
            )
          );
        }
      }
    } catch (error) {
      console.error('Ошибка обновления количества:', error);
    }
  };

  // Удалить один товар (уменьшить количество)
  const removeFromCart = async (productId) => {
    const item = cartItems.find((item) => item.product_id === productId);
    if (item) {
      const newQuantity = item.quantity - 1;
      await updateQuantity(productId, newQuantity);
    }
  };

  // Удалить товар полностью
  const removeItemCompletely = async (productId) => {
    try {
      const response = await fetch('/api/cart_action.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          product_id: productId
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.product_id !== productId)
        );
      }
    } catch (error) {
      console.error('Ошибка удаления товара:', error);
    }
  };

  // Очистить корзину
  const clearCart = async () => {
    for (const item of cartItems) {
      await removeItemCompletely(item.product_id);
    }
    setCartItems([]);
  };

  // Получить количество конкретного товара
  const getItemQuantity = (productId) => {
    const item = cartItems.find((item) => item.product_id === productId);
    return item ? item.quantity : 0;
  };

  // Общее количество товаров
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Общая сумма
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  };

  // Перезагрузить корзину (полезно после авторизации)
  const refreshCart = () => {
    loadCart();
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    removeItemCompletely,
    updateQuantity,
    clearCart,
    getItemQuantity,
    getTotalQuantity,
    getTotalPrice,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};