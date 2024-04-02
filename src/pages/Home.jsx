import { useMutation, useQuery } from "@apollo/client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useState } from "react";
import AddClient from "../components/AddClient";
import { GET_CLIENTS } from "../graphql-queries/ClientQueries";
import { Delete_Client_Mutation } from "../graphql-mutations/ClientMutations";
import ListProjects from "../components/ListProjects";
import AddProject from "../components/AddProject";
import { GET_PROJECTS } from "../graphql-queries/ProjectQueries";

const Home = () => {
  const [addClientDialog, setAddClientDialogue] = useState(false);
  const [addPojectDialog, setAddPojectDialog] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_CLIENTS);
  const [deleteClient] = useMutation(Delete_Client_Mutation);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  const closeClientDialog = () => {
    setAddClientDialogue(false);
  }

  const closeProjectDialog = () => {
    setAddPojectDialog(false);
  }

  const removeClient = (id) => {
    deleteClient({
      variables: { id: id },
      refetchQueries:[{ query: GET_PROJECTS },{query:GET_CLIENTS}]
    //   update(cache, { data: { deleteClient } }) {
    //     const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //     cache.writeQuery({
    //       query: GET_CLIENTS,
    //       data: { clients: clients.filter(client => client.id !== deleteClient.id) }
    //     })
    //   }
    })
  }

  return (
    <div className="home-list">
      <TableContainer component={Paper} className="home-table-container">
        <div className="home-full-button">
          <Button style={{ marginRight: '10px' }} variant="contained" onClick={() => setAddClientDialogue(true)}>Add Client</Button>
          <Button variant="contained" color="success" onClick={() => setAddPojectDialog(true)}>New Project</Button>

        </div>
        <div>
          <ListProjects />
        </div>
        <Table sx={{ maxWidth: 650, margin: 2 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.clients.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left"><EditIcon className="icon-button" /> <DeleteIcon className="icon-button" onClick={() => removeClient(row.id)} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {addClientDialog && <AddClient openDialog={addClientDialog} closeDialog={closeClientDialog} refetch={refetch} />}
      {addPojectDialog && <AddProject openDialog={addPojectDialog} closeDialog={closeProjectDialog} />}
    </div>
  )
}

export default Home
