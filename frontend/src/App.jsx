import { useState, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import ProductList from "./components/productlist";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import ReceiptModal from "./components/ReceiptModal";
import { getProducts } from "./api/api";

export default function App() {
  const [receipt, setReceipt] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);

      const cats = Array.from(new Set(data.map((p) => p.category))).sort();
      setCategories(["All", ...cats]);
    }
    loadProducts();
  }, []);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <CartProvider>
      <header
        style={{ background: "#2244aa", color: "white", padding: "15px 20px" }}
      >
        <h1 style={{ margin: 0 }}>Vibe E-Com Cart</h1>
      </header>

      {/* Category navigation bar */}
      <nav style={{ margin: "20px", marginBottom: "10px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              marginRight: 10,
              backgroundColor: activeCategory === cat ? "#2244aa" : "#ccc",
              color: activeCategory === cat ? "white" : "black",
              padding: "8px 16px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div style={{ display: "flex", minHeight: "80vh", padding: "20px" }}>
        <main style={{ flex: 3, marginRight: 20 }}>
          <ProductList products={filteredProducts} />
        </main>

        <aside
          style={{
            flex: 1,
            maxWidth: 350,
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            padding: 20,
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            gap: 15,
          }}
        >
          <h2>Your Cart</h2>
          <Cart />
          <CheckoutForm onReceipt={setReceipt} />
        </aside>
      </div>

      <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
    </CartProvider>
  );
}
