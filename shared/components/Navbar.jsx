import React from 'react';
export function Navbar({ theme, setTheme, cartCount=0 }) {
  return (
    <header className="navbar" role="banner" aria-label="Barra de navegação">
      <div className="nav-inner" style={{maxWidth:1100,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.75rem 1rem'}}>
        <div className="logo" aria-hidden style={{fontWeight:700,color:'var(--accent)'}}>HardwareStore</div>
        <div className="controls" style={{display:'flex',gap:8}}>
          <button aria-label={`Alterar tema (atual ${theme})`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="theme-toggle">{theme === 'light' ? '🌙':'🌑'}</button>
          <button className="cart" aria-label={`Carrinho com ${cartCount} itens`} style={{padding:'6px 10px',borderRadius:8,border:'none',background:'transparent'}}>Carrinho <span className="badge" aria-hidden style={{marginLeft:6,background:'var(--accent)',color:'#fff',padding:'2px 8px',borderRadius:999}}>{cartCount}</span></button>
        </div>
      </div>
    </header>
  );
}
