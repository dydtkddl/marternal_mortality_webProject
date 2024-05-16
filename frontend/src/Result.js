import React from 'react';
import Matrix from './Matrix';
import './App.css'; // 추가된 CSS 파일 import

const data = [
    { id: 'A1', serious: 7, probability: 10 },
    { id: 'A2', serious: 5, probability: 3 },
    { id: 'A3', serious: 4, probability: 4 },
    { id: 'B1', serious: 2, probability: 2 },
    { id: 'B2', serious: 3, probability: 2 },
    { id: 'B3', serious: 7, probability: 7 },
    { id: 'B4', serious: 8, probability: 8 },
    { id: 'B5', serious: 7, probability: 7 },
    { id: 'C1', serious: 7, probability: 8 },
    { id: 'C2', serious: 7, probability: 8 },
    { id: 'C3', serious: 2, probability: 3 },
    { id: 'D1', serious: 9, probability: 9 },
    { id: 'D3', serious: 6, probability: 4 },
    { id: 'D4', serious: 6, probability: 4 },
    { id: 'E1', serious: 6, probability: 6 },
    { id: 'E2', serious: 5, probability: 5 },
    { id: 'E3', serious: 4, probability: 4 },
    { id: 'F1', serious: 7, probability: 7 },
    { id: 'F2', serious: 8, probability: 8 },
    { id: 'F3', serious: 8, probability: 8 },
    { id: 'G1', serious: 5, probability: 6 },
    { id: 'G2', serious: 7, probability: 7 }
];

const Result = () => {
    return (
        <div className="App">
            <Matrix data={data} />
        </div>
    );
};

export default Result;
