import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import cypmo from "../assets/cypmo.png"
import {motion} from "framer-motion"

const Home = () => {
  return (
    <Box bgColor={'azure'} w={'full'} h={'85vh'}>
      <motion.div
      style={{
        height: "80vh",

      }}
      animate={{
        translateY: "20px"
      }}
      transition={{
        duration:5,
        repeat:Infinity,
        repeatType:"reverse"
      }}
      >
      <Image 
      w={'full'} 
      h={'full'} 
      objectFit={'contain'} 
      src={cypmo} 
      filter={'grayscale(1)'}
      />
      </motion.div>
      
      <Text 
      fontSize={'6xl'} 
      textAlign={'center'} 
      fontWeight={'thin'} 
      color={'blackAlpha.700'} 
      mt={'-20'}>
        Crypmo
        </Text>
    </Box>
  )
}

export default Home