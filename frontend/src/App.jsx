import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

/* Pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import MyProducts from "./pages/MyProducts";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Navbar />
        <main className="min-h-[calc(100vh-160px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            {/* Browse Products */}
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />

            {/* Customer */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute role="customer">
                  <Cart />
                </ProtectedRoute>
              }
            />

            {/* Farmer */}
            <Route
              path="/my-products"
              element={
                <ProtectedRoute role="farmer">
                  <MyProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-product"
              element={
                <ProtectedRoute role="farmer">
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="farmer">
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";

// /* Pages */
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ProductList from "./pages/ProductList";
// import MyProducts from "./pages/MyProducts";
// import AddProduct from "./pages/AddProduct";
// import ProductDetails from "./pages/ProductDetails";
// import Cart from "./pages/Cart";
// import Dashboard from "./pages/Dashboard";

// export default function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Navbar />
//         <main className="min-h-[calc(100vh-160px)]">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/product/:id" element={<ProductDetails />} />

//             {/* Browse Products: accessible to all logged-in users */}
//             <Route
//               path="/products"
//               element={
//                 <ProtectedRoute>
//                   <ProductList />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Customer-only routes */}
//             <Route
//               path="/cart"
//               element={
//                 <ProtectedRoute role="customer">
//                   <Cart />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Farmer-only routes */}
//             <Route
//               path="/my-products"
//               element={
//                 <ProtectedRoute role="farmer">
//                   <MyProducts />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/add-product"
//               element={
//                 <ProtectedRoute role="farmer">
//                   <AddProduct />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute role="farmer">
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Fallback */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </main>
//         <Footer />
//       </AuthProvider>
//     </Router>
//   );
// }
