import React, { useState } from 'react';
import styles from './AppModules.module.css';
import { PRODUCTS } from '../data/products';
import { Navbar } from '../shared/components/Navbar';
import { ProductCard } from '../shared/components/ProductCard';
import { useThemeStorage } from '../shared/hooks/useTheme';

export default function AppModules(){
  const [theme, setTheme] = useThemeStorage();
  const [cart, setCart] = useState([]);
  const [loadingIds, setLoadingIds] = useState([]);

  function addToCart(product){
    if(loadingIds.includes(product.id)) return;
    setLoadingIds(s=>[...s, product.id]);
    setTimeout(()=>{
      setCart(c=>[...c, product]);
      setLoadingIds(s=>s.filter(id=>id!==product.id));
    }, 900 + Math.random()*700);
  }

  return (
    <div>
      <Navbar theme={theme} setTheme={setTheme} cartCount={cart.length} />
      <main className={styles.container}>
        <section className={styles.grid} role="list" aria-label="Produtos">
          {PRODUCTS.map(p=> (
            <div key={p.id} className={styles.productCard}>
              <ProductCard product={p} addToCart={addToCart} loading={loadingIds.includes(p.id)} variant={(p.id%3===0)?'outline':(p.id%3===1)?'solid':'ghost'} />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
