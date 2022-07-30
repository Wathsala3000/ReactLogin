import {Route, Routes} from "react-router-dom";
import Main from "./component/mainpage/mainpage";
import Signin from "./component/signin/signin";
import Signup from "./component/signup/signup";
function App() {

  return (
    <div className="App">
      <h1>Hello React!!</h1>
      <Routes>
        <Route path="/" exact element={<Main/>} />
        <Route path="/signin" exact element={<Signin/>} /> 
        <Route path="/signup" exact element={<Signup/>} /> 
      </Routes>
    </div>
  );
}

export default App;
