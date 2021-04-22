import React from 'react';
import { useGlobal } from '../../providers/GlobalContext/GlobalContext';

export default function Private({ children }) {
  const globalContext = useGlobal();

  return <>{globalContext.user ? children : ''}</>;
}
