'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch } from '../app/lib/store/hooks';
import { updatePrice } from '../app/lib/store/slices/tokenSlice';

export function useWebSocket(symbols: string[]) {
  const dispatch = useAppDispatch();
  const intervalRef = useRef<NodeJS.Timeout>();

  const simulatePriceUpdate = useCallback(() => {
    symbols.forEach((symbol) => {
      const randomChange = (Math.random() - 0.5) * 0.0001;
      const newPrice = Math.max(0.00001, Math.random() * 0.001 + randomChange);
      dispatch(updatePrice({ symbol, price: newPrice }));
    });
  }, [symbols, dispatch]);

  useEffect(() => {
    intervalRef.current = setInterval(simulatePriceUpdate, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [simulatePriceUpdate]);
}
