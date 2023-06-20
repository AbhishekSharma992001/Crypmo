import React from 'react'
import { Image, Heading, VStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const CoinsCard = ({id, name, img, price, symbol, currencySymbol = "₹"}) => {
  return (
      <Link to={`/coins/${id}`} rel={'noreferrer'}>
    <VStack 
    w={'52'} 
    shadow={'lg'} 
    borderRadius={'lg'} 
    p={'2'}
    m={'2'} 
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
        {symbol}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price? `${currencySymbol}${price}`:"NA"}</Text>
    </VStack>
  </Link>
  )
}

export default CoinsCard