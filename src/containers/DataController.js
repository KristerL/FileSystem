import React, {useState} from "react"
import styled from "styled-components";

const InputContainer = styled.div`
    display:flex;
    flex-direction:column;
`;

const InputBox = styled.div`
    display:flex;
    flex-direction:column;
    
    h3{
        width:400px;
        text-align:left;
    }
    
    input[type="radio"]{
        height:19px;
        width:19px;
    }
`;

const DataController = ({processes, processHandler, selected}) => {
    const [customProcess, setCustomProcess] = useState(null);

    const handleCustomInput = (el) => {
        setCustomProcess(el);
    };

    const handleCustomSelect = () => {
        if (customProcess) {
            processHandler(customProcess);
        }
    };

    return (
        <InputContainer>
            <h4>Vali või sisesta järjend (A,2;B,3;A,-;C,4;D,5;B,-;E,15)</h4>
            <InputBox>
                {Object.keys(processes).map(item =>
                    <h3 key={item}><input readOnly checked={selected === processes[item]}
                                          onClick={() => processHandler(processes[item])} type={"radio"}
                                          name={"process"}/>{item} {processes[item]}</h3>)}
                <h3><input type={"radio"} name={"process"} onClick={handleCustomSelect}/>Sisesta Enda <input
                    type={"textarea"} onChange={target => handleCustomInput(target.target.value)}/></h3>
            </InputBox>
        </InputContainer>
    )
};

export default DataController;