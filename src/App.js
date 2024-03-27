import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import ListUsers from './components/ListUsers';
import ListMovies from './components/ListMovies';
function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ListUsers />
        {/* <ListMovies /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
