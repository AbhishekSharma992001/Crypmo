import { Box, Stat, Container, HStack, Radio, RadioGroup, VStack, Text, Image, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Button} from '@chakra-ui/react'
import React, { useEffect, useState} from 'react'
import Loader from './Loader';
import axios from 'axios';
import { server } from '../index';
import { useParams } from 'react-router-dom';
import Error from './Error';
import CustomBar from './CustomBar';
import Item from './Item';
import Chart from './Chart';

const CoinsDetails = () => {
  const [coins, setCoins] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [days, setDays] = useState('24h');
  const [chartArray, setChartArrays] = useState([]);
  const [currency, setCurrency] = useState("inr");
  
  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };
  
  const params = useParams();


  useEffect(() => {
    const fetchCoins = async() => {
      try {
      const {data} = await axios.get(`${server}/coins/${params.id}`)
      const {data: chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
      setCoins(data);
      setChartArrays(chartData.prices)
      setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
      
    };
    fetchCoins()
  }, [params.id, currency, days]) 
  
  if (error) return <Error message={"Error while fetching coins"}/>;


  return (
  <Container maxW={'container.xl'}>
    {
      Loading?<Loader/>:(
        <>
        <Box 
        width={'full'}  
        borderWidth={1}>
          <Chart arr={chartArray} currency={currencySymbol} days={days}/>
        </Box>
        <HStack p={'4'} wrap={'wrap'}>
          {
            btns.map((i)=>(
              <Button disabled={days === i} key={i} onClick={()=> switchChartStats(i)}>{i}</Button>
            ))
          }
        </HStack>

        <RadioGroup 
        value={currency} 
        onChange={setCurrency}>
          <HStack spacing={"4"}>
            <Radio value='inr'>Inr</Radio>
            <Radio value='usd'>Usd</Radio>
            <Radio value='eur'>Eur</Radio>
          </HStack>
        </RadioGroup>
        <VStack 
        spacing={'4'} 
        p={'16'} 
        alignItems={'flex-start'}>
        <Text
        fontSize={'small'}
        alignSelf={"center"}
        opacity={0.7}>
          Last Updated On {Date(coins.last_updated).split('G')[0]}
        </Text>
        <Image 
        src={coins.image.large}
        w={"16"} 
        h={"16"}
        objectFit={"contain"}/>
        <Stat>
          <StatLabel>{coins.name}</StatLabel>
          <StatNumber>{currencySymbol}{coins.market_data.current_price[currency]}</StatNumber>
        <StatHelpText>
          <StatArrow type={coins.market_data.price_change_percentage_24h > 0 ? "increase" : 'decrease'}/>  
          {coins.market_data.price_change_percentage_24h}
        </StatHelpText>
        </Stat>
        <Badge 
        fontSize={'2xl'} 
        bgColor={'blackAlpha.800'} 
        color={'white'}>
          {`#${coins.market_cap_rank}`}
        </Badge>
        <CustomBar 
        high={`${currencySymbol}${coins.market_data.high_24h[currency]}`}
        low={`${currencySymbol}${coins.market_data.low_24h[currency]}`}/>
        </VStack>
        <Box w={'full'} p="4">
          <Item title={'Max supply'} value={coins.market_data.max_supply}/>
          <Item title={'Circulating Supply'} value={coins.market_data.circulating_supply}/>
          <Item title={'Maket Cap'} value={coins.market_data.market_cap[currency]}/>
          <Item title={'Low'} value={coins.market_data.atl[currency]}/>
          <Item title={'High'} value={coins.market_data.ath[currency]}/>
        </Box>
        </>
      )
    }
  </Container>
)}

export default CoinsDetails