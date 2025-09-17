import React from "react";

export function ProductCard({
  product,
  addToCart,
  loading = false,
  variant = "solid",
  disabled = false,
}) {
  const variantClass =
    variant === "outline"
      ? "btn-outline"
      : variant === "ghost"
      ? "btn-ghost"
      : "btn-solid";

  return (
    <article
      className="product-card"
      tabIndex={0}
      aria-labelledby={`title-${product.id}`}
      aria-describedby={`price-${product.id}`}
    >
      <div className="img-wrap" aria-hidden>
        {loading ? (
          <div className="skeleton" />
        ) : (
          <img
            src={product.image}
            alt={`Imagem do produto ${product.title}`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "https://picsum.photos/300/200?grayscale";
            }}
          />
        )}
      </div>

      <div className="meta">
        <h3 id={`title-${product.id}`} className="title">
          {product.title}
        </h3>
        <div className="sub">
          <span id={`price-${product.id}`} className="price">
            R$ {product.price.toFixed(2)}
          </span>
          <span
            className="rating"
            aria-label={`Avaliação ${product.rating} de 5`}
          >
            {"★".repeat(Math.round(product.rating))}
          </span>
          {product.tag && (
            <span className="tag" aria-hidden>
              {product.tag}
            </span>
          )}
        </div>

        <div className="actions" style={{ marginTop: "auto" }}>
          <button
            className={`btn ${variantClass}`}
            onClick={() => addToCart(product)}
            disabled={disabled}
            aria-disabled={disabled}
          >
            {loading ? "Carregando..." : "Adicionar"}
          </button>
        </div>
      </div>
    </article>
  );
}
