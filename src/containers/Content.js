import React, {useState} from "react"
import DataController from "./DataController";
import ButtonController from "./ButtonController";
import styled from "styled-components";
import Display from "./Display";

const ControllerContainer = styled.div`
    display:flex;
    justify-content:space-evenly
`;

const processes = {
    Esimene: "A,2;B,3;A,-;C,4;D,5;B,-;E,5",
    Teine: "A,4;B,3;C,6;D,5;B,-;E,5;A,-;F,10",
    Kolmas: "A,2;B,3;C,4;D,5;B,-;E,7;D,-;F,10;A,-;G,1;H,1;G,-;I,10;J,8;I,-",
};

const Container = () => {
    const [process, setProcess] = useState(processes.Esimene);

    const processChangeHandler = (process) => {
        setProcess(process);
    };

    const resetFields = () => {
        setProcess("A,2;B,3;A,-;C,4;D,5;B,-;E,5");
    };

    return (
        <div>
            <h1>Graafilise kasutajaliidesega simulaator failisüsteemi töö
                visualiseerimiseks</h1>
            <ControllerContainer>
                <DataController processes={processes} processHandler={processChangeHandler} selected={process}/>
                <ButtonController reset={resetFields}/>
            </ControllerContainer>
            <Display process={process}/>
        </div>
    )
};

export default Container;