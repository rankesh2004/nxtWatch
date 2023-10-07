import styled from 'styled-components'

export const Button = styled.button`
  color: ${props => (props.isActive ? '#2563eb' : '#64748b')};
`
export const ButtonContainer = styled.div`
  display: flex;
`
