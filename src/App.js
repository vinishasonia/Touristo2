// import logo from "./logo.svg";
// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ToggleColorMode from "./Modules/admin/component/Nav/ToggleColorMode";
// import AdminRoute from "./Modules/admin/Route/AdminRoute";
// import UserRoute from "./Modules/user/Route/UserRoute";
// import UserLogin from './Modules/user/Components/Pages/UserLogin';
// import Register from './Modules/user/Components/Pages/Register';
// import ForgotPassword from "./Modules/user/Components/Pages/ForgotPassword";
// function App() {
//   return (
//     <div>
//       <ToggleColorMode>
//       <BrowserRouter>
//         <Routes>

//           <Route exact path="/admin/*" element={<AdminRoute />}/>
//          <Route exact path="/*" element={<UserRoute/>}/>
//          <Route exact path="user/UserLogin"  element={<UserLogin/>}/>
//          {/* <Route exact path="user/Register" element={<Register/>}/> */}
//          <Route  exact path="user/Register" element={<Register/>}/>
//          <Route  exact path="user/forgot" element={<ForgotPassword/>}/>
//         </Routes>
//       </BrowserRouter>
//       </ToggleColorMode>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoute from "./Modules/admin/Route/AdminRoute";
import UserRoute from "./Modules/user/Route/UserRoute";
import { AuthProvider } from "./Modules/GlobalContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact path="/admin/*" element={<AdminRoute />} />
            <Route exact path="/*" element={<UserRoute />} />
            {/* <Route exact path="/login" element={<UserLogin />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/forgot" element={<ForgotPassword />} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
