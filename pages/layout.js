import React from 'react'
import SideBar from '../components/Sidebar'
// import ChatRoom from '../components/ChatRoom/ChatRoom'
import styled from 'styled-components'

const Container = styled.div`
display : grid;
grid-template-columns: 3fr 9fr;
padding: 3.125rem 15.625rem;
`

const layout = () => {
    return (
        <Container>

            <SideBar />
            {/* <ChatRoom /> */}
          
        </Container>
    )
}

export default layout
