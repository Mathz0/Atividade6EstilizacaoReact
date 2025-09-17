import React, { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { PRODUCTS } from '../data/products';
import { useThemeStorage } from '../shared/hooks/useTheme';

const light = { bg:'#ffffff', surface:'#f8fafc', text:'#0f1724', muted:'#6b7280', accent:'#1e3a8a', accentContrast:'#ffffff', cardShadow:'0 6px 18px rgba(16,24,40,0.06)'};
const dark = { bg:'#091226', surface:'#071024', text:'#e6eef8', muted:'#9aa6b2', accent:'#60a5fa', accentContrast:'#071024', cardShadow:'0 6px 22px rgba(2,6,23,0.6)'};

const Global = createGlobalStyle` body { margin:0; font-family: Inter, system-ui; background:${p=>p.theme.bg}; color:${p=>p.theme.text}; } `;

const Header = styled.header` position:sticky; top:0; background:${p=>p.theme.surface}; border-bottom:1px solid rgba(0,0,0,0.04); `;
const Container = styled.main` max-width:1100px; margin:1.25rem auto; padding:0 1rem; `;
const Grid = styled.section` display:grid; gap:1rem; grid-template-columns: repeat(4,1fr);
@media(max-width:1024px){ grid-template-columns: repeat(3,1fr);} @media(max-width:768px){ grid-template-columns: repeat(2,1fr);} @media(max-width:480px){ grid-template-columns: repeat(1,1fr);} `;
const Card = styled.article` background:${p=>p.theme.surface}; border-radius:12px; overflow:hidden; transition: transform 200ms ease, box-shadow 200ms ease; box-shadow: ${p=>p.theme.cardShadow}; &:hover{ transform: translateY(-6px);} &:focus{ outline:3px solid rgba(96,165,250,0.18);} `;

export default function AppStyled(){
  const [themeName, setThemeName] = useThemeStorage();
  const theme = themeName === 'dark' ? dark : light;
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
    <ThemeProvider theme={theme}>
      <Global />
      <Header>
        <div style={{maxWidth:1100, margin:'0 auto', padding:'0.75rem 1rem', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontWeight:700, color:theme.accent}}>MiniHardware</div>
          <div style={{display:'flex', gap:8}}>
            <button onClick={()=>setThemeName(themeName==='light'?'dark':'light')} aria-label={`Alterar tema (atual ${themeName})`}>{themeName==='light'?'🌙':'🌑'}</button>
            <button> Carrinho <span style={{background:theme.accent,color:'white',padding:'2px 8px',borderRadius:999}}>{cart.length}</span></button>
          </div>
        </div>
      </Header>
      <Container>
        <Grid role="list" aria-label="Produtos">
          {PRODUCTS.map(p=> (
            <Card key={p.id} tabIndex={0} aria-labelledby={`title-${p.id}`} aria-describedby={`price-${p.id}`}>
              <div style={{aspectRatio:'1/1', background:'#e6e6e6', display:'flex', alignItems:'center', justifyContent:'center'}}>Imagem</div>
              <div style={{padding:12, display:'flex', flexDirection:'column', gap:8}}>
                <h3 id={`title-${p.id}`} style={{margin:0, fontSize:15, lineHeight:'1.1'}}>{p.title}</h3>
                <div style={{display:'flex', gap:8, alignItems:'center', color:theme.muted}}>
                  <span id={`price-${p.id}`} style={{fontWeight:600,color:theme.text}}>R$ {p.price.toFixed(2)}</span>
                  <span aria-hidden>{'★'.repeat(Math.round(p.rating))}</span>
                  {p.tag && <span style={{marginLeft:'auto', background:'rgba(99,102,241,0.1)', color:theme.accent, padding:'2px 8px', borderRadius:999}}>{p.tag}</span>}
                </div>
                <div style={{marginTop:'auto'}}>
                  <button onClick={()=>addToCart(p)} disabled={loadingIds.includes(p.id)} aria-disabled={loadingIds.includes(p.id)} style={{width:'100%', padding:'8px', borderRadius:8, border:'none', background:p.id%3===1?theme.accent:'transparent', color:p.id%3===1?theme.accentContrast:theme.text, borderWidth:p.id%3===0?1:0, borderStyle:'solid', borderColor:'rgba(0,0,0,0.08)'}}>{loadingIds.includes(p.id)?'Carregando...':'Adicionar'}</button>
                </div>
              </div>
            </Card>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
