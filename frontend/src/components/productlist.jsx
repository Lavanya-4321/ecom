import { useCart } from "../context/CartContext";
import { FaMobileAlt, FaLaptop, FaBook, FaTshirt, FaRegGem, FaDatabase } from "react-icons/fa";
import { FaMicrochip,FaMemory,FaGamepad,FaPlug,FaRobot   } from "react-icons/fa";

// Usage inside your component


export default function ProductList({ products }) {
  const { add } = useCart();

  // Return specific icon based on product category
  function getProductIcon(product) {
    switch (product.category) {
      case "Mobiles":
        return <FaMobileAlt size={72} />;
      case "Laptops":
        return <FaLaptop size={72} />;
      case "Books":
        return <FaBook size={72} />;
      case "Fashion":
        return <FaTshirt size={72} />;
      case "Beauty":
        return <FaRegGem size={72} />;
      case "Storage":
        return <FaDatabase size={72} />;
      default:
        return <FaDatabase   size={72} />;
    }
  }

  if (!products.length) return <p>No products found.</p>;

  return (
    <div className="grid">
      {products.map((product) => (
        <div className="card" key={product._id}>
          <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
            {getProductIcon(product)}
          </div>
          <div>{product.name}</div>
          <div>₹{product.price.toFixed(2)}</div>
          <button onClick={() => add(product._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
