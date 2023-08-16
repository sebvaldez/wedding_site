import styled from 'styled-components';

export const SubmitButton = styled.button`
    padding: 1rem 2rem;  // Increased padding for easy click on mobile
    background-color: #8AA399;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;  // gap between icon and text
    transition: background-color 0.3s ease;
    font-size: 1.2rem;  // Increased font size for visibility

    &:hover {
        background-color: #799982;
    }

    &:disabled {
        background-color: #A89FBF;  // Use the muted purple when disabled
        cursor: not-allowed;
    }
`;
