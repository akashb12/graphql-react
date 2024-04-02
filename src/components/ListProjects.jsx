import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql-queries/ProjectQueries";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
const ListProjects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS);
    if (loading) return <p>Loading...</p>;

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

    return (
        <div style={{ overflowX: 'auto', maxWidth: '675px', whiteSpace: 'nowrap' }}>
            {data.projects && data.projects.map((row, index) => (
                <Card key={index} style={{ display: 'inline-block', margin: '10px', minWidth: '275px' }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {row.name.toUpperCase()}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Status:- <b>{row.status}</b>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to={`/project/${row.id}`}>
                            <Button size="small">View</Button>
                        </Link>
                    </CardActions>
                </Card>
            ))}
        </div>
    )
}

export default ListProjects
