import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:space-evenly;
    align-items:center;
    height:95%;
    
    button{
        width:200px;
        background-color:white;
        height:50px;
    }
`;
const ButtonController = ({reset}) => {

    return (
        <div>
            <ButtonContainer>
                <button onClick={() => reset()}>Puhasta väljund</button>
            </ButtonContainer>
        </div>
    )
};

export default ButtonController;