import AppToolbar from "./layout/Toolbar/AppToolbar";
import Footer from "./layout/Footer/Footer";

const App = () => {

  return (
    <div>
      <AppToolbar search="" onSearchChange={() => { }} />
      <Footer />
    </div>
  );
}

export default App;
