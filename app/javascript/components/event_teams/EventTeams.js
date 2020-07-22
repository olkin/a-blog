import React, {useEffect, useState} from 'react';
import axios from "axios";
import EventTeam from "./EventTeam";
import Schedule from "../Schedule";

function TeamsList({teams, onTeamDeleted}) {
    return (
        <>
            <h2>Teams</h2>
            {teams.map((team) =>
                <EventTeam key={team.id}
                       team={team}
                       onTeamDeleted={onTeamDeleted}
                />
            )}
        </>
    );
}

function EventTeams(props) {
    const [teamsState, setTeamsState] = useState({teams: [], loading: null});

    const teamsUrl = {
        index: `/api/v1/events/${props.match.params.id}/teams`
    };

    const loadTeams = () => {
        axios.get(teamsUrl.index,
            { withCredentials: true }
        ).then(response => {
            setTeamsState({loading: false, teams: response.data});
        }).catch(error => {
            console.log("events error", error)
        })
    }

    const onTeamDeleted = (team_id) => {
        const newTeams = teamsState.teams.filter(team => team.id !== team_id);
        setTeamsState({...teamsState, teams: newTeams});
    };

    useEffect(() => {
        setTeamsState({...teamsState, loading: true});
        loadTeams();
    }, [setTeamsState]);

    if (teamsState.loading == null || teamsState.loading) return <>Loading...</>;
    if (teamsState.teams.length === 0) return <>No scheduled teams</>;
    return (
        <div className="grid-x">
            <div className="cell small-8">
                <Schedule />
            </div>
            <div className="cell small-4">
                <TeamsList teams={teamsState.teams} onTeamDeleted={onTeamDeleted}/>
            </div>
        </div>
    );
}

export default EventTeams;