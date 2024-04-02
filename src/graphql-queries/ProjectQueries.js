import { gql } from '@apollo/client';
const GET_PROJECTS = gql`
query getProjects {
    projects{
    name
    description
    id
    status
    client{
      name
    }
    
  }
  }
`;
const GET_PROJECT = gql`
query getProject($id:ID!) {
    project(id:$id){
    name
    description
    id
    status
    client{
      name
      email
      phone
    }
    
  }
  }
`;
export {GET_PROJECTS,GET_PROJECT}
