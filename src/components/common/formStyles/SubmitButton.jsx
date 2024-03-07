import styled from 'styled-components';
import { COLOR_PALETTE } from '../../../styles/Colors';

export const SubmitButton = styled.button`
    padding: 1rem 2rem;  // Increased padding for easy click on mobile
    background-color: ${COLOR_PALETTE['sageGreen']};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;  // gap between icon and text

    max-width: 450px; // Set your desired maximum width
    width: 100%; // This will ensure the button takes the full width up to max-width
    align-self: center;

    transition: background-color 0.3s ease;
    font-size: 1.2rem;  // Increased font size for visibility

    &:hover {
        background-color: ${COLOR_PALETTE['darkGreen']};
    }

    &:disabled {
        background-color: ${COLOR_PALETTE['mauve']};
        cursor: not-allowed;
    }
`;
