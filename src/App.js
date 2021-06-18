import './App.css';
import Wrapper from './components/Wrapper';
import useWindowDimensions from './components/GetWindowDimentions';

function App() {
	const { height, width } = useWindowDimensions();

	return (
		<div>
			<Wrapper dimentions={{ height, width }}></Wrapper>;
		</div>
	);
}

export default App;
