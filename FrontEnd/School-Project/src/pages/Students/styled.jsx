import styled from 'styled-components'

export const StudentContainer = styled.section`
  margin-top: 22px;

  div {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  div + div {
    border-top: 1px solid #eee;
  }
`

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`
