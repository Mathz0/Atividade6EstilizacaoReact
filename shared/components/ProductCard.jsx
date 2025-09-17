import React from 'react';
export function ProductCard({ product, addToCart, loading=false, variant='solid', disabled=false }) {
  return (
    <article className="product-card" tabIndex={0} aria-labelledby={`title-${product.id}`} aria-describedby={`price-${product.id}`} style={{display:'flex',flexDirection:'column',borderRadius:12,overflow:'hidden'}}>
      <div className="img-wrap" style={{aspectRatio:'1/1',backgroundColor:'#e6e6e6',display:'flex',alignItems:'center',justifyContent:'center'}}>
        {loading ? <div className="skeleton" aria-hidden style={{width:'100%',height:'100%'}} /> : <img src={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><rect fill='%23dddddd' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='24' fill='%23666'>Imagem</text></svg>`} alt="Imagem do produto" loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover'}} />}
      </div>
      <div className="meta" style={{padding:12,display:'flex',flexDirection:'column',gap:8}}>
        <h3 id={`title-${product.id}`} className="title" style={{fontSize:15,lineHeight:1.1,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{product.title}</h3>
        <div className="sub" style={{display:'flex',gap:8,alignItems:'center',color:'#6b7280'}}>
          <span id={`price-${product.id}`} className="price" style={{fontWeight:600,color:'inherit'}}>R$ {product.price.toFixed(2)}</span>
          <span className="rating" aria-label={`Avaliação ${product.rating} de 5`}>{'★'.repeat(Math.round(product.rating))}</span>
          {product.tag && <span className="tag" aria-hidden style={{marginLeft:'auto',background:'rgba(99,102,241,0.1)',color:'var(--accent)',padding:'2px 8px',borderRadius:999,fontSize:12}}>{product.tag}</span>}
        </div>
        <div className="actions" style={{marginTop:'auto'}}>
          <button className={`btn btn-${variant}`} onClick={() => addToCart(product)} disabled={disabled} aria-disabled={disabled} style={{padding:'8px 10px',borderRadius:8,width:'100%'}}>{loading ? 'Carregando...' : 'Adicionar'}</button>
        </div>
      </div>
    </article>
  );
}
