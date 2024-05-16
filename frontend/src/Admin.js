import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Select, MenuItem, Paper } from '@mui/material';
import Footer from './Footer';
import './App.css';

const Admin = () => {
    const [scenarios, setScenarios] = useState([]);
    const [newScenario, setNewScenario] = useState({ subsystem: '', detail: '' });
    const [subsystemChoices, setSubsystemChoices] = useState([]);

    // 고정된 서브시스템 순서 배열
    const fixedSubsystemOrder = [
        'Complication', 
        'Precondition', 
        'Medicine', 
        'Facility', 
        'Socioeconomic', 
        'HumanResource', 
        'Individual'
    ];

    useEffect(() => {
        axios.get('http://localhost:8000/api/scenarios/')
            .then(response => {
                setScenarios(response.data);
            });

        axios.get('http://localhost:8000/api/subsystem_choices/')
            .then(response => {
                setSubsystemChoices(response.data);
            });
    }, []);

    const handleScenarioChange = (e, id, field) => {
        const updatedScenarios = scenarios.map(scenario => {
            if (scenario.id === id) {
                return { ...scenario, [field]: e.target.value };
            }
            return scenario;
        });
        setScenarios(updatedScenarios);
    };

    const handleNewScenarioChange = (e) => {
        setNewScenario({ ...newScenario, [e.target.name]: e.target.value });
    };

    const updateScenario = (id) => {
        const scenario = scenarios.find(scenario => scenario.id === id);
        if (!scenario.subsystem) {
            alert('Please select a subsystem before updating.');
            return;
        }
        axios.put(`http://localhost:8000/api/scenarios/${id}/`, scenario);
    };

    const addScenario = () => {
        if (!newScenario.subsystem) {
            alert('Please select a subsystem before adding.');
            return;
        }
        axios.post('http://localhost:8000/api/scenarios/', newScenario)
            .then(response => {
                setScenarios([...scenarios, response.data]);
                setNewScenario({ subsystem: '', detail: '' }); // Reset the form after adding
            });
    };

    const deleteScenario = (id) => {
        axios.delete(`http://localhost:8000/api/scenarios/${id}/`)
            .then(() => {
                setScenarios(scenarios.filter(scenario => scenario.id !== id));
            });
    };

    // 서브시스템 순서 배열을 기준으로 그룹화
    const groupedScenarios = fixedSubsystemOrder.reduce((groups, subsystem) => {
        groups[subsystem] = scenarios.filter(scenario => scenario.subsystem === subsystem);
        return groups;
    }, {});

    return (
        <Container className="app-container">
                <Typography variant="h4" sx ={{fontWeight : 600}}>Admin Page</Typography>
            <Paper elevation={16} style={{ padding: 16, marginBottom: 16, position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, backgroundColor: 'white' }}>
                
                <Typography variant="h6">Add New Scenario</Typography>
                <Select
                    name="subsystem"
                    value={newScenario.subsystem}
                    onChange={handleNewScenarioChange}
                    displayEmpty
                    style={{ marginRight: 8, width: 200 }}
                >
                    <MenuItem value="" disabled>Select Subsystem</MenuItem>
                    {subsystemChoices.map(choice => (
                        <MenuItem key={choice[0]} value={choice[0]}>
                            {choice[1]}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    label="Detail"
                    name="detail"
                    value={newScenario.detail}
                    onChange={handleNewScenarioChange}
                    style={{ marginRight: 8, width: 400 }}
                />
                <Button variant="contained" color="primary" onClick={addScenario}>Add</Button>
            </Paper>
            <div style={{ marginTop: 150 }}>
                {fixedSubsystemOrder.map((subsystem, groupIndex) => (
                    <Paper key={subsystem} elevation={16} style={{ padding: 16, marginBottom: 16 }}>
                        <Typography variant="h6">{subsystem}</Typography>
                        {groupedScenarios[subsystem].map((scenario, scenarioIndex) => (
                            <Box key={scenario.id} mb={3} display="flex" alignItems="center">
                                <Select
                                    value={scenario.subsystem}
                                    onChange={(e) => handleScenarioChange(e, scenario.id, 'subsystem')}
                                    displayEmpty
                                    style={{ marginRight: 8, width: 200 }}
                                >
                                    <MenuItem value="" disabled>Select Subsystem</MenuItem>
                                    {subsystemChoices.map(choice => (
                                        <MenuItem key={choice[0]} value={choice[0]}>
                                            {choice[1]}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <TextField
                                    label="Detail"
                                    value={scenario.detail}
                                    onChange={(e) => handleScenarioChange(e, scenario.id, 'detail')}
                                    style={{ marginRight: 8, width: 400 }}
                                />
                                <Button variant="contained" color="primary" onClick={() => updateScenario(scenario.id)} style={{ marginRight: 8 }}>Update</Button>
                                <Button variant="contained" color="secondary" onClick={() => deleteScenario(scenario.id)}>Delete</Button>
                            </Box>
                        ))}
                    </Paper>
                ))}
            </div>
            <Footer />
        </Container>
    );
};

export default Admin;
