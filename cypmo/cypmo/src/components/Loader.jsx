import { Box, CircularProgress, VStack } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <VStack 
    h={'90vh'} 
    justifyContent={"center"}
    >
    <Box transform={"scale(3)"}>
      <CircularProgress isIndeterminate color="gray" />
    </Box>
    </VStack>
  )
}

export default Loader