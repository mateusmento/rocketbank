import ReactDOM from 'react-dom/client';

function App() {
    return (
        <h3>Hello world</h3>
    );
}

const root = document.getElementById("root");
ReactDOM.createRoot(root)
    .render(<App/>);
