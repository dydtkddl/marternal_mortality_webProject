import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import Footer from './Footer';
import './App.css'; // 추가된 CSS 파일 import
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 훅을 사용
const App = () => {
    const [scenarios, setScenarios] = useState([]);
    const [responses, setResponses] = useState({});
    const navigate = useNavigate(); // useNavigate 훅 사용
    useEffect(() => {
        axios.get('http://localhost:8000/api/scenarios/')
            .then(response => {
                setScenarios(response.data);
            });
    }, []);

    const handleChange = (e, id, field) => {
        const value = Math.max(0, Math.min(10, Number(e.target.value)));  // 0~10 범위로 제한
        const newResponses = { ...responses };
        if (!newResponses[id]) newResponses[id] = {};
        newResponses[id][field] = value;
        setResponses(newResponses);
    };

    const handleSubmit = () => {

        const allFieldsValid = Object.values(responses).every(response =>
            response.occurrence !== undefined &&
            response.severity !== undefined &&
            response.detection !== undefined
        );
        if (Object.keys(responses).length !== 0){
            if (allFieldsValid) {
                console.log(allFieldsValid)
                Object.keys(responses).forEach(id => {

                    axios.post('http://localhost:8000/api/survey_responses/', {
                        scenario: id,
                        occurrence: responses[id].occurrence,
                        severity: responses[id].severity,
                        detection: responses[id].detection,
                    });
                });
                navigate('/thank-you'); // Thank You 페이지로 리디렉션
            } else {
                window.alert('All fields are required and must be within 0 to 10.');
            }}
        else{
            window.alert("All fields are required")
        }
    };

    const groupedScenarios = scenarios.reduce((groups, scenario) => {
        const { subsystem } = scenario;
        if (!groups[subsystem]) {
            groups[subsystem] = [];
        }
        groups[subsystem].push(scenario);
        return groups;
    }, {});

    return (
        <Container className="app-container">
            <Typography variant="h3" sx={{ fontWeight: 700, mt: 4, mb: 3 }} gutterBottom>Maternal Mortality Survey</Typography>
            {Object.keys(groupedScenarios).map((subsystem, groupIndex) => (
                <Paper key={subsystem} elevation={16} style={{ padding: 16, marginBottom: 16 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800 }} gutterBottom>{subsystem}</Typography>
                    {groupedScenarios[subsystem].map((scenario, scenarioIndex) => (
                        <Box key={scenario.id} mb={3}>
                            <Typography variant="h6">
                                {`${groupIndex + 1}-${scenarioIndex + 1} ${scenario.detail}`}
                            </Typography>
                            <TextField
                                label="Occurrence"
                                type="number"
                                required
                                inputProps={{ min: 0, max: 10, step: 1 }}  // 최소값과 최대값 및 step 설정
                                value={responses[scenario.id]?.occurrence || ''}
                                onChange={(e) => handleChange(e, scenario.id, 'occurrence')}
                                style={{ marginRight: 8, width: '150px' }}
                            />
                            <TextField
                                label="Severity"
                                type="number"
                                required
                                inputProps={{ min: 0, max: 10, step: 1 }}  // 최소값과 최대값 및 step 설정
                                value={responses[scenario.id]?.severity || ''}
                                onChange={(e) => handleChange(e, scenario.id, 'severity')}
                                style={{ marginRight: 8, width: '150px' }}
                            />
                            <TextField
                                label="Detection"
                                type="number"
                                required
                                inputProps={{ min: 0, max: 10, step: 1 }}  // 최소값과 최대값 및 step 설정
                                value={responses[scenario.id]?.detection || ''}
                                onChange={(e) => handleChange(e, scenario.id, 'detection')}
                                style={{ marginRight: 8, width: '150px' }}
                            />
                        </Box>
                    ))}
                </Paper>
            ))}
            <Button sx={{ width: "70%", ml: "15%", height: 50, fontWeight: 800, fontSize: 20 }} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            <Footer />
        </Container>
    );
};

export default App;
