import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react'

const CreateUser = ({refetch}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [username, setUsername] = useState("");

  const CREATE_USER_MUTATION = gql`
      mutation Mutation($input: createUserInput!) {
        createUser(input: $input) {
          age
          id
          name
          nationality
          username
        }
      }
    `
  const [createUser] = useMutation(CREATE_USER_MUTATION)

  return (
    <div>
      <input type="text" placeholder='name' onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder='age' onChange={(e) => setAge(e.target.value)} />
      <input type="text" placeholder='nationality' onChange={(e) => setNationality(e.target.value.toUpperCase())} />
      <input type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)} />
      <button onClick={() => {
        createUser({
          variables: {
            "input": {
              "age": Number(age),
              "name": name,
              "nationality": nationality,
              "username": username
            }
          }
        })
        refetch()
      }}>Submit</button>

    </div>
  )
}

export default CreateUser
