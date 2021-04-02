import Board from './components/Board';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <Board />
    </ChakraProvider>
  );
}

export default App;
