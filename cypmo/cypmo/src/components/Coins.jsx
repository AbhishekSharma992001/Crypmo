import React, {useEffect, useState} from 'react'
import axios from "axios";
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import { server } from '../index'
import CoinsCard from './CoinsCard';
import Loader from './Loader'
import Error from './Error';

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  
  const changePage = (page)=> {setPage(page); setLoading(true)};

  const btns = new Array(101).fill(1)

  useEffect(() => {
    const fetchCoins = async() => {
      try {
      const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
      setCoins(data);
      setLoading(false);
      console.log(data)
      } catch (error) {
        setError(true);
        setLoading(false);
      }
      
    };
    fetchCoins()
  }, [currency, page])
  
  if (error) return <Error message={"Error while fetching coins"}/>;

  return (
    <Container maxW={"container.xl"} >
      {Loading ? (<Loader/>) : (
        <>
        <RadioGroup value={currency} onChange={setCurrency}>
          <HStack spacing={"4"}>
            <Radio value='inr'>Inr</Radio>
            <Radio value='usd'>Usd</Radio>
            <Radio value='eur'>Eur</Radio>
          </HStack>
        </RadioGroup>
        <HStack wrap={'wrap'} justifyContent={'space-evenly'} >
          {coins.map((i)=>(
            <CoinsCard
            id={i.id}
            key={i.id}
            name={i.name} 
            img={i.image} 
            price={i.current_price} 
            symbol={i.symbol} 
            currencySymbol={currencySymbol}
            />
          ))}
        </HStack>
        <HStack w={"full"} overflow={"auto"} p={'8'}>
          {btns.map((items, index)=> (
            <Button
            key={index}
            colorScheme={'gray'}
            onClick={()=> changePage(index+1)}>
              {index+1}
            </Button>
          ))}
        </HStack>
        </>
        )}
    </Container>
  );
};

export default Coins;