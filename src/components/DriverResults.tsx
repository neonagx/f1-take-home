import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface Results {
    number: string;
    position: string;
    FastestLap: {
        Time: {
            time: string
        },
        AverageSpeed: {
            units: string,
            speed: string
        }
    };
}

interface Races {
    round: string;
    season: string;
    raceName: string;
    Circuit: {
        Location: {
            country: string
        },
        circuitName: string
    };
    Results: Results[]
}

const DriverResults: FC = () => {
    const { id } = useParams();
    const [races, setRaces] = useState<Races[]>([]);
    const [driver, setDriver] = useState<string>('');

    useEffect(() => {
        const getDriverResultsData = async () => {
            await fetch(`https://ergast.com/api/f1/current/drivers/${id}/results.json`)
                .then(res => res.json())
                .then(results => {
                    setRaces(results['MRData']['RaceTable']['Races']);
                    setDriver(`${results['MRData']['RaceTable']['Races'][0]['Results'][0]['Driver']['givenName']} ${results['MRData']['RaceTable']['Races'][0]['Results'][0]['Driver']['familyName']}`)
                })
                .catch(err => console.log(err))
        };
        getDriverResultsData()
    }, [id]);

    return (
        <div>
            <h2>{driver} Results</h2>
            <Link to={'/'}>Go Back To Overall Results</Link>

            <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Round</TableCell>
                            <TableCell>Season</TableCell>
                            <TableCell>Race Name</TableCell>
                            <TableCell>Circuit</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Fastest Lap Time</TableCell>
                            <TableCell>Average Speed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {races.map(race => (
                            <TableRow
                                key={race['round']}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{race['round']}</TableCell>
                                <TableCell>{race['season']}</TableCell>
                                <TableCell>{race['raceName']}</TableCell>
                                <TableCell>{<Link to={`/raceresults/${race['round']}`}>{`${race['Circuit']['circuitName']}`}</Link>}</TableCell>
                                <TableCell>{race['Circuit']['Location']['country']}</TableCell>
                                <TableCell>{race['Results'][0]['number']}</TableCell>
                                <TableCell>{race['Results'][0]['position']}</TableCell>
                                <TableCell>{race['Results'][0]['FastestLap'] ? race['Results'][0]['FastestLap']['Time']['time'] : ''}</TableCell>
                                <TableCell>{race['Results'][0]['FastestLap']? race['Results'][0]['FastestLap']['AverageSpeed']['speed'] + race['Results'][0]['FastestLap']['AverageSpeed']['units'] : ''}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default DriverResults;