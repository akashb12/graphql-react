import { useQuery, gql } from '@apollo/client';
import CreateUser from './CreateUser';
const ListUsers = () => {
    const GET_USERS = gql`
    query Users {
        users {
          id
          name
          nationality
          username
        }
    }
    `;
    const { loading, error, data,refetch } = useQuery(GET_USERS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <div>
            <CreateUser refetch={refetch}/>
            <h1>list users</h1>
            {data.users.map((user)=> (
                <div key={user.id}>
                <h3>Name: {user.name}</h3>
                <p>UserName: {user.username}</p>
                <p>From :{user.nationality}</p>
                <br />
              </div>
            ))}
        </div>
    )
}

export default ListUsers
