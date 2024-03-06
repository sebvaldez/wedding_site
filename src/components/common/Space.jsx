import styled from 'styled-components';


const Space = styled.div`
  /* border: ${props => props.border || '2px solid red'}; */
  margin-top: ${props => props.marginTop || '.5rem'};
  margin-bottom: ${props => props.marginBottom || '.5rem'};
  margin-left: ${props => props.marginLeft || 0};
  margin-right: ${props => props.marginRight || 0};
  padding-top: ${props => props.paddingTop || 0};
  padding-bottom: ${props => props.paddingBottom || 0};
  padding-left: ${props => props.paddingLeft || 0};
  padding-right: ${props => props.paddingRight || 0};
`;

export default Space;