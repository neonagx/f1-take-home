import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface Driver {
    dateOfBirth: string;
    driverId: string;
    givenName: string;
    familyName: string;
    nationality: string;
}

interface OverallData {
    position: string;
    Driver: Driver
}

interface OverallRaces {
    round: string;
}

const Overall: FC = () => {
    const [overallData, setOverallData] = useState<OverallData[]>([]);
    const [overallRaces, setOverallRaces] = useState<OverallRaces[]>([]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const getOverallData = async () => {
            await fetch('http://ergast.com/api/f1/current/driverStandings.json')
                .then(res => res.json())
                .then(results => setOverallData(results['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']))
                .catch(err => console.log(err))
        };

        const getOverallRaces = async () => {
            await fetch('https://ergast.com/api/f1/current/races.json')
                .then(res => res.json())
                .then(results => setOverallRaces(results['MRData']['RaceTable']['Races']))
                .catch(err => console.log(err))
        };
        getOverallData()
        getOverallRaces();
    }, []);

    return (
        <div>
            <h2>Overall Standing 2022</h2>

            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Go To Race Results
                </Button>
                <Menu
                    className="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {overallRaces.map((race) => <MenuItem key={race['round']} onClick={handleClose}><Link to={`/raceresults/${race['round']}`}>{race['round']}</Link></MenuItem>)}
                </Menu>
            </div>

            <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Position</TableCell>
                            <TableCell align="left">Driver</TableCell>
                            <TableCell align="left">Date Of Birth</TableCell>
                            <TableCell align="left">Nationality</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {overallData.map(data => (
                            <TableRow
                                key={data['position']}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">{data['position']}</TableCell>
                                <TableCell align="left">{<Link to={`/driverresults/${data['Driver']['driverId']}`}>{`${data['Driver']['givenName']} ${data['Driver']['familyName']}`}</Link>}</TableCell>
                                <TableCell align="left">{data['Driver']['dateOfBirth']}</TableCell>
                                <TableCell align="left">{data['Driver']['nationality']}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}

export default Overall;