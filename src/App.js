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
          <InfoBox title="Coronavirus Cases" cases={123} total={2000}></InfoBox>
          <InfoBox title="Recovered" cases={12311} total={3000}></InfoBox>
          <InfoBox title="Deaths" cases={3432} total={400}></InfoBox>
       </div>
    </div>
  );
}

export default App;
