import { Container, Heading, useColorModeValue, VStack, Box, Input, Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../Store/product'

function CreatePage() {
  const [newProduct, setProduct] = useState({
    name: "",
    price: "",
    image: ""
  })

  const toast = useToast()
  const { createProduct }= useProductStore()

  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct)
    if(!success){
      toast({
        title:"ERROR",
        description: message,
        status: "error",
        isClosable: true
      })
    }else{
      toast({
        title:"SUCCESS",
        description: message,
        status: "success",
        isClosable: true
      })
    }
    setProduct({
      name: "",
      price: "",
      image: ""
    })
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={'2x1'} textAlign={"center"} mb={8}>Create New Product</Heading>
        <Box
          w={"full"} bg={useColorModeValue("white", "gray.800")}
          p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack>
            <Input 
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setProduct({...newProduct, name: e.target.value})}
            />
            <Input 
              placeholder='Price'
              name='name'
              value={newProduct.price}
              onChange={(e) => setProduct({...newProduct, price: e.target.value})}
            />
            <Input 
              placeholder='Image URL'
              name='name'
              value={newProduct.image}
              onChange={(e) => setProduct({...newProduct, image: e.target.value})}
            />
            <Button onClick={handleAddProduct} w={"full"}>Add Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage