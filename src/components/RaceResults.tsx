import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface RaceResultsByRound {
    number: string;
    position: string;
    Driver: {
        driverId: string,
        givenName: string,
        familyName: string
    };
    laps: string;
    status: string;
    Time: {
        time: string
    };
    FastestLap: {
        Time: {
            time: string
        },
        AverageSpeed: {
            units: string,
            speed: string
        }
    }
}

const RaceResults: FC = () => {
    const { round } = useParams();
    const [raceName, setRaceName] = useState<string>('');
    const [raceResults, setRaceResults] = useState<RaceResultsByRound[]>([]);

    useEffect(() => {

        const getRaceResultsData = async () => {
            await fetch(`http://ergast.com/api/f1/current/${round}/results.json`)
                .then(res => res.json())
                .then(results => {
                    setRaceName(results['MRData']['RaceTable']['Races'][0]['raceName']);
                    setRaceResults(results['MRData']['RaceTable']['Races'][0]['Results'])
                })
                .catch(err => console.log(err))
        };
        getRaceResultsData()
    }, [round]);

    return (
        <div>
            <h2>{raceName}</h2>
            <Link to={'/'}>Go Back To Overall Results</Link>
            <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Driver Number</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Driver Name</TableCell>
                            <TableCell>Laps</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Fastest Lap Time</TableCell>
                            <TableCell>Average Speed</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {raceResults.map((results: any) => (
                            <TableRow
                                key={results['position']}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{results['number']}</TableCell>
                                <TableCell>{results['position']}</TableCell>
                                <TableCell>{<Link to={`/driverresults/${results['Driver']['driverId']}`}>{`${results['Driver']['givenName']} ${results['Driver']['familyName']}`}</Link>}</TableCell>
                                <TableCell>{results['laps']}</TableCell>
                                <TableCell>{results['status']}</TableCell>
                                <TableCell>{results['Time'] ? results['Time']['time'] : ''}</TableCell>
                                <TableCell>{results['FastestLap'] ? results['FastestLap']['Time']['time'] : ''}</TableCell>
                                <TableCell>`{results['FastestLap'] ? `${results['FastestLap']['AverageSpeed']['speed']} ${results['FastestLap']['AverageSpeed']['units']}` : ''}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )
}

export default RaceResults;