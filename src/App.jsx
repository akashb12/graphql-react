import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ListUsers from './components/ListUsers';
import ListMovies from './components/ListMovies';
import Home from './pages/Home';
import ProjectDetail from './components/ProjectDetail';
function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      {/* <div className="App"> */}
        {/* <ListUsers /> */}
        {/* <ListMovies /> */}
      {/* </div> */}
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/project/:id' element={<ProjectDetail />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
