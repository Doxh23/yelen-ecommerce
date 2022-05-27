import React, { useState } from "react";
import Allproduct from "./components/Allproduct";
const [products, setproducts] = useState({});
function App() {
  return <Allproduct products={products} setproducts={setproducts} />;
}

export default App;
