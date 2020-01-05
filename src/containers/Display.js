import React, {useEffect, useState} from "react";
import styled from "styled-components";

const RowContainer = styled.div`
    display:flex;
    align-items: center;
    margin-bottom:5px;
    h1{
        margin:0;
        margin-right:10px;
        font-size:18px;
    }
`;

const Block = styled.div`
    width:20px;
    height:20px;
    border: 0.5px solid black;
`;

const MemoryContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin-top:50px;
`;

const TextContainer = styled.div`
    width:100%;
    display:flex;
    justify-content: start;
    font-size:18px;
`;


const Display = ({process}) => {
    const [visualize, setVisualize] = useState([]);
    const [fragmentPercentage, setFragmentPercentage] = useState();
    const [fragmentCoveragePercentage, setFragmentCoveragePercentage] = useState();

    useEffect(() => {
        let memory = [];

        process.split(";").forEach(el => {
            const subel = el.split(",");
            memory.push({
                name: subel[0],
                weight: subel[1],
            });
        });

        builder(memory);
    }, [process]);

    useEffect(() =>{
        if(visualize.length !== 0){
            fragments();
        }
    }, [visualize]);

    const fragments = () => {
        if(visualize[0]) {
            const lastResult = visualize[visualize.length -1];
            let fragmentKeys = [];

            let passed = [lastResult[0]];
            let currentBlock = lastResult[0];
            lastResult.forEach(el => {
                if (currentBlock !== el) {
                    currentBlock = el;
                    if(passed.includes(currentBlock) && currentBlock !== " "){
                        fragmentKeys.push(currentBlock);
                    }
                }
                if(currentBlock !== " "){
                    passed.push(currentBlock);
                }
            });

            const area = lastResult.reduce((area, current) => area + +fragmentKeys.includes(current) , 0);
            setFragmentPercentage(Math.round(fragmentKeys.length / [...new Set(passed)].length * 10000) /100);
            setFragmentCoveragePercentage(Math.round((area) / (passed.length -1) * 10000) /100);
        }
    };

    const builder = (steps) => {
        let blocks = [];
        let startingRow = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "];
        blocks.push(startingRow);
        steps.forEach(row => {
            if (row.weight === "-") {
                startingRow = startingRow.map(el => el === row.name ? " " : el);
            } else {
                let counter = row.weight;
                startingRow = startingRow.map(el => {
                    if (counter === 0) return el;
                    if (el === " ") {
                        counter--;
                        return row.name;
                    }
                    return el;
                });
                if (counter !== 0) {
                    startingRow = ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "E", "R", "R", "O", "R", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"];
                    blocks.push(startingRow);
                    return;
                }
            }
            blocks.push(startingRow);
        });
        setVisualize(blocks);
    };

    return (
        <div>
            <div>
                <p>Allesjäänud failidest on fragmenteerunud {fragmentPercentage}%</p>
                <p>Fragmenteerunud failidele kuulub {fragmentCoveragePercentage}% kasutatud ruumist</p>
            </div>
            <MemoryContainer>
                {visualize !== undefined ? visualize.map((row, id) => <RowContainer key={id}>
                    <h1>Samm {id}</h1> {row.map((el, id) => <Block style={{background: el === " " ? "white" : "orange"}}
                                                                   key={id}>{el}</Block>)}</RowContainer>) : " "}
            </MemoryContainer>
        </div>
    )
};

export default Display;