import { gql } from "@apollo/client"
// add project 
const ADD_PROJECT_MUTATION = gql`
  mutation addProject($name:String!,$description:String!,$status:String!,$clientId:ID!){
    addProject(name:$name,description:$description,status:$status,clientId:$clientId){
        id
        name
        description
        status
        client{
            id
            name
            email
            phone
        }
    }
  }
`

const UPDATE_PROJECT_MUTATION = gql`
  mutation updateProject($id:ID!,$name:String!,$description:String!,$status:String!){
    updateProject(id:$id,name:$name,description:$description,status:$status){
        id
        name
        description
        status
        client{
            id
            name
            email
            phone
        }
    }
  }
`

const DELETE_PROJECT_MUTATION = gql`
  mutation deleteProject($id:ID!) {
    deleteProject(id:$id) {
      name
    }
  }
`
export {ADD_PROJECT_MUTATION,UPDATE_PROJECT_MUTATION,DELETE_PROJECT_MUTATION}