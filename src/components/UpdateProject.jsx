import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import { ADD_PROJECT_MUTATION, UPDATE_PROJECT_MUTATION } from '../graphql-mutations/ProjectMutation'
import { useMutation, useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../graphql-queries/ClientQueries';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { GET_PROJECTS } from '../graphql-queries/ProjectQueries';

const UpdateProject = ({ openDialog, closeDialog,projectData }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(projectData.name);
    const [description, setDescription] = useState(projectData.description);
    const [updateProject] = useMutation(UPDATE_PROJECT_MUTATION);
    const { loading, error, data,refetch } = useQuery(GET_CLIENTS);
    
    useEffect(() => {
        setOpen(openDialog)
    }, [openDialog])
    
    const handleClose = () => {
        setOpen(false);
        closeDialog()
    };
    if(loading) return <p>Loading...</p>;
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        updateProject({
                            variables: {
                                id:projectData.id,
                                name: formJson.name,
                                description: formJson.description,
                                status: formJson.status
                            },
                           

                        })
                        closeDialog();
                    },
                }}
            >
                <DialogTitle>Update Project</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>setName(e.target.value)}
                        value={name}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="textarea"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>setDescription(e.target.value)}
                        value={description}
                    />
                    <FormControl fullWidth style={{marginTop:'10px'}}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Status
                        </InputLabel>
                        <NativeSelect
                            defaultValue={projectData.status}
                            inputProps={{
                                name: 'status',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </NativeSelect>
                    </FormControl>
                    {error && <span className='error'>*{error}</span>}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdateProject