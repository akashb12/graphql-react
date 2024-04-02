import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import { Add_Client_Mutation } from '../graphql-mutations/ClientMutations'
import { useMutation } from '@apollo/client';
import { GET_CLIENTS } from '../graphql-queries/ClientQueries';

const AddClient = ({ openDialog, closeDialog, refetch }) => {
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [addClient] = useMutation(Add_Client_Mutation);



    useEffect(() => {
        setOpen(openDialog)
    }, [openDialog])

    const handleClose = () => {
        setOpen(false);
        closeDialog()
    };
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
                        addClient({
                            variables: {
                                name: formJson.name,
                                email: formJson.email,
                                phone: formJson.phone
                            },
                            update(cache, { data: { addClient } }) {
                                const { clients } = cache.readQuery({ query: GET_CLIENTS });
                                cache.writeQuery({
                                    query: GET_CLIENTS,
                                    data: { clients: {...clients,addClient} }
                                })
                            }

                        })
                        closeDialog();
                    },
                }}
            >
                <DialogTitle>Add Client</DialogTitle>
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
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="Phone"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
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

export default AddClient