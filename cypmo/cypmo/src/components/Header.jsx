import React from 'react'
import { Button, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HStack 
    bg={'blackAlpha.700'}
    p={'5'}
    justifyContent={'center'}
    spacing={'10'}
    >
      <Button variant={"unstyled"} color={'whitesmoke'}>
        <Link to='/'>Home</Link>
      </Button>
      <Button variant={"unstyled"} color={'whitesmoke'}>
        <Link to='/coins'>Coins</Link>
      </Button>
      <Button variant={"unstyled"} color={'whitesmoke'}>
        <Link to='/exchanges'>Exchanges</Link>
      </Button>
    </HStack>
  )
}

export default Header