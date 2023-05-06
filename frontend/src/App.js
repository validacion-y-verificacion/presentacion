import logo from './logo.svg';
import './App.css';

const url = "http://127.0.0.1:5000/get-all-books"

function App() {
  const token = "1b7a1f5b-0678-44fd-a3b2-0254adb4a959"
  fetch(url,{
    method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({token: token})
  }).then(response => {
    console.log(response.json())
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
