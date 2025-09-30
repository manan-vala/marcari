import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./main-components/Navbar";
import Products from "./main-components/Products";
import ProductDetails from "./main-components/ProductDetails";
import CreateForm from "./main-components/CreateForm";
import EditForm from "./main-components/EditForm";
import Login from "./main-components/Login";
import Register from "./main-components/Register";
// import Apitext from "./Apitext";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/new" element={<CreateForm />} />
          <Route path="/products/:id/edit" element={<EditForm />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
        </Routes>
      </Router>
      {/* <Apitext /> */}
    </>
  );
}

export default App;
