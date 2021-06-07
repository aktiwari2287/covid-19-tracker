import './App.css';
import Header from './components/Header';
import InfoBox from './components/InfoBox';
function App() {
  return (
    <div className="App">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <Header></Header>
        </div>
       <div className="app__stats">
          <InfoBox></InfoBox>
       </div>
    </div>
  );
}

export default App;
