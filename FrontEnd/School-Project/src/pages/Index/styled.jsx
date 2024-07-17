import styled from 'styled-components'
import * as colors from '../../config/colors'

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  input {
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid transparent;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`
