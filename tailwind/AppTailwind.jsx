import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { useThemeStorage } from '../shared/hooks/useTheme';

export default function AppTailwind(){
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
    <div className={theme==='dark'?'dark':''}>
      <div className={theme === 'dark' ? 'bg-slate-900 text-slate-100 min-h-screen' : 'bg-white text-slate-900 min-h-screen'}>
        <header className="sticky top-0 bg-opacity-90 backdrop-blur z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
            <div className="font-bold text-xl text-blue-700">MiniHardware</div>
            <div className="flex gap-2">
              <button onClick={()=>setTheme(theme==='light'?'dark':'light')} aria-label={`Alterar tema (atual ${theme})`} className="p-2 rounded-md">{theme==='light'?'🌙':'🌑'}</button>
              <button className="p-2 rounded-md">Carrinho <span className="ml-1 bg-blue-600 text-white px-2 rounded-full">{cart.length}</span></button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-4">
          <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" role="list" aria-label="Produtos">
            {PRODUCTS.map(p=> (
              <article key={p.id} tabIndex={0} className="bg-white dark:bg-slate-800 rounded-lg shadow transition-transform hover:-translate-y-2 focus:outline-none focus:ring-2" aria-labelledby={`title-${p.id}`} aria-describedby={`price-${p.id}`}>
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <div className="text-gray-400">Imagem</div>
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <h3 id={`title-${p.id}`} className="line-clamp-2 font-medium">{p.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span id={`price-${p.id}`} className="text-gray-900 dark:text-gray-100 font-semibold">R$ {p.price.toFixed(2)}</span>
                    <span aria-hidden>{'★'.repeat(Math.round(p.rating))}</span>
                    {p.tag && <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">{p.tag}</span>}
                  </div>
                  <div className="mt-auto">
                    <button onClick={()=>addToCart(p)} disabled={loadingIds.includes(p.id)} className={`w-full py-2 rounded-md ${p.id%3===1? 'bg-blue-600 text-white' : p.id%3===0 ? 'border border-gray-300' : 'bg-transparent'}`}>{loadingIds.includes(p.id)?'Carregando...':'Adicionar'}</button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
