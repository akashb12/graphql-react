import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { GET_PROJECT, GET_PROJECTS } from '../graphql-queries/ProjectQueries';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link, useNavigate, useParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { DELETE_PROJECT_MUTATION } from '../graphql-mutations/ProjectMutation';
import UpdateProject from './UpdateProject';

const ProjectDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [updatePojectDialog, setUpdatePojectDialog] = useState(false);
    const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });
    const [deleteProject] = useMutation(DELETE_PROJECT_MUTATION, { variables: { id }, onCompleted: () => navigate('/'), refetchQueries: [{ query: GET_PROJECTS }] })
    if (loading) return <p>Loading...</p>;

    const closeProjectDialog = () => {
        setUpdatePojectDialog(false);
    }

    const style = {
        py: 0,
        width: '100%',
        maxWidth: 360,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
    };

    const card = (
        <React.Fragment>
            <CardContent>
                <Link to="/">
                    <Button size="small"><ArrowBackIcon />Back</Button>
                </Link>
                <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                    <b>{data.project.name.toUpperCase()}</b>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5, fontSize: 16 }}>
                    {data.project.description}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 20, mb: 2.5 }}>
                    <b>Project Status</b>
                    <br />
                    {data.project.status}
                </Typography>
                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                    <b>Client Information</b>
                </Typography>
                <List sx={style}>
                    <ListItem>
                        <BadgeIcon style={{ marginRight: '10px' }} />
                        <ListItemText primary={data.project.client.name.toUpperCase()} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <EmailIcon style={{ marginRight: '10px' }} />
                        <ListItemText primary={data.project.client.email} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                        <LocalPhoneIcon style={{ marginRight: '10px' }} />
                        <ListItemText primary={data.project.client.phone} />
                    </ListItem>
                </List>
                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <Button style={{ marginRight: '10px' }} variant="contained" color='success' onClick={() => setUpdatePojectDialog(true)}>Update Project</Button>
                    <Button style={{ marginRight: '10px' }} variant="contained" color='error' onClick={deleteProject} >Delete Project</Button>
                </div>
            </CardContent>
      {updatePojectDialog && <UpdateProject openDialog={updatePojectDialog} closeDialog={closeProjectDialog} projectData = {data.project} />}

        </React.Fragment>
    );
    return (
        <Box sx={{ minWidth: "700px" }} className="project-detail-parent">
            <Card variant="outlined" sx={{ maxWidth: 675 }}>{card}</Card>
        </Box>
    )
}

export default ProjectDetail
