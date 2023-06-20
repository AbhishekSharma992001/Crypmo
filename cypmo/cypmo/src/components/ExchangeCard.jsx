import React from 'react'
import { Image, Heading, VStack, Text } from '@chakra-ui/react'

const ExchangeCard = ({name, img, cntry, rank, since, url}) => {
  return (
      <a href={url} target={'blank'} rel={'noreferrer'}>
    <VStack 
    w={'52'} 
    shadow={'lg'} 
    borderRadius={'lg'} 
    p={'8'}
    m={'4'} 
    transition={'all 0.2s'}
    css={{
      "&:hover":
        {transform:"scale(1.1)",}
    }}
    >
      <Image
      src={img} 
      w={'10'} 
      h={'10'}
      objectFit={'contain'}
      alt={'Exchange'}
      />
      <Heading size={'md'} noOfLines={1}>
        {rank}
      </Heading>
      <Text noOfLines={1}>${name}</Text>
    </VStack>
  </a>
  )
}

export default ExchangeCard