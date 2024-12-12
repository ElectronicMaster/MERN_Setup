import { Container, SimpleGrid, VStack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../Store/product'
import ProductCart from '../Components/ProductCart'

function HomePage() {
  const {fetchProduct,product} = useProductStore();
  useEffect(()=>{
    fetchProduct()
  },[fetchProduct]) 
  console.log(product)

  return (
    <Container maxW={'container.xl'} py={12}>
      <VStack spacing={8}>      
        <SimpleGrid 
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }} 
          spacing={10}
          w={"full"}
        >
          {product.map((product) => (
            <ProductCart key={product._id} product={product}/>
          ))}
        </SimpleGrid>

        {
          product.length === 0 && (
              <Text
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                bgClip='text'
                fontSize='54xl'
                fontWeight='extrabold'
                textAlign={"center"}
              >
                Current Product
              
              <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={'gray.500'}>
                no Product Found {" "}
                <Link to={"/create"}>
                  <Text as={"span"} color={'blue.500'} _hover={{textDecoration:"underline"}}>
                    Create a Product
                  </Text>
                </Link>
              </Text>
            </Text>
          )
        }
      </VStack>
    </Container>
  )
}

export default HomePage