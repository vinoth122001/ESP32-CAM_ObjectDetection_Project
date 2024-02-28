import Product from "./components/Product";
import "./App.css";


const App = (props) => {


  return (
    <>
      <h1 className="title">Retail Store Management</h1>
      <div className="wrapper">
        <Product box='12'/>
      </div>

    </>
  );
};

export default App;
