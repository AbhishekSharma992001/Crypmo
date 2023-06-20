import React, {useEffect, useState} from 'react'
import axios from "axios";
import { Container, HStack } from '@chakra-ui/react';
import { server } from '../index'
import Loader from './Loader'
import ExchangeCard from './ExchangeCard';
import Error from './Error';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([])
  const [Loading, setLoading] = useState(true)
  const [error, setError] = useState(false)


  useEffect(() => {
    const fetchExchanges = async() => {
      try {
      const {data} = await axios.get(`${server}/exchanges`)
      setExchanges(data);
      setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges()
  }, [])
  
  if (error) return <Error message={"Error"}/>;

  return (
    <Container maxW={"container.xl"} >
      {Loading ? (<Loader/>) : (
        <>
        <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
          {exchanges.map((i)=>(
            <ExchangeCard
            key={i.id}
            name={i.name} 
            img={i.image} 
            cntry={i.country} 
            rank={i.trust_score_rank} 
            since={i.year_established} 
            url={i.url}/>
          ))}
        </HStack>
        </>
        )}
    </Container>
  );
};

export default Exchanges