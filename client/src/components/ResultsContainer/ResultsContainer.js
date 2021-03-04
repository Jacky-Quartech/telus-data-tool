import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const ResultsContainerBase = () => {
    return (
        <div>
            <h1>Results</h1>
        </div>
    )
}

const ResultsContainer = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div className="results">
            {loading ? <CircularProgress /> : <ResultsContainerBase />}
        </div>
    )
}

export default ResultsContainer;