import React, {useEffect, useState} from 'react';
import axios from "axios";

function MatchesList({matches, onMatchDeleted}) {
    return (
        <>
            Match
        </>
    );
}

function Schedule(props) {
    const [matchesState, setMatchesState] = useState({matches: [], loading: null});

    const matchesUrl = {
        index: `/api/v1/events/${props.event.id || props.match.params.id}/matches`
    };

    const loadMatches = () => {
        axios.get(matchesUrl.index,
            { withCredentials: true }
        ).then(response => {
            setMatchesState({loading: false, matches: response.data});
        }).catch(error => {
            console.log("matches error", error)
        })
    }

    const onMatchDeleted = (match_id) => {
        const newMatches = matchesState.teams.filter(match => match.id !== match_id);
        setMatchesState({...matchesState, teams: newMatches});
    };

    useEffect(() => {
        setMatchesState({...matchesState, loading: true});
        loadMatches();
    }, [setMatchesState]);

    if (matchesState.loading == null || matchesState.loading) return <>Loading...</>;
    if (matchesState.matches.length === 0) return <>No scheduled matches</>;
    return (
        <div>
            <h2>Schedule</h2>
            <div>
                <MatchesList matches={matches} onMatchDeleted={onMatchDeleted}/>
            </div>
        </div>
    );
}

export default Schedule;