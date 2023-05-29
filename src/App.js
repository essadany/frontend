import logo from './logo.svg';
import './App.css';
import SideNavBar from './components/sidebar/SideNavBar';
import Tab from './components/tabs/Tab';
import Header from './components/header/Header';
import Product from './components/products/Product';


function App() {
  return (
    <div className="App container-s">
     <SideNavBar />
   
      <Header />
      <Tab />
      <Product />

      
   
     
    </div>
  );
}

export default App;
