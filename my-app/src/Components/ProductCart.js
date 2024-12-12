import { Button,VStack,Input,useDisclosure, Box,Heading,HStack,IconButton,Image,Modal,ModalCloseButton,ModalContent,ModalHeader,ModalOverlay,Text, useColorModeValue, useToast, ModalBody, ModalFooter } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdEdit,MdDelete } from "react-icons/md";
import { useProductStore } from '../Store/product';

function ProductCart({product}) {
  const [updatedProduct,setUpdatedProduct] = useState(product)
  const textColor = useColorModeValue("gray.600","gray.200")
  const bg = useColorModeValue("white","gray.800")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {deleteProduct,updateProduct} = useProductStore()
  const toast = useToast()

  const handleUpdateProduct = async(pid) => {
    const {success,message} = await updateProduct(pid,updatedProduct)
    if(success){
      toast({
        title:"ERROR",
        description: message,
        status: "error",
        duration:3000,
        isClosable: true
      })
    }else{
      toast({
        title:"SUCCESS",
        description: message,
        status: "success",
        duration:3000,
        isClosable: true
      })
    }
  }

  const handleDeleteProduct = async(pid) => {
    const {success,message} = await deleteProduct(pid)
    if(!success){
      toast({
        title:"ERROR",
        description: message,
        status: "error",
        duration:3000,
        isClosable: true
      })
    }else{
      toast({
        title:"SUCCESS",
        description: message,
        status: "success",
        duration:3000,
        isClosable: true
      })
    }
  }

  return (
    <Box
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{transform: "translateY(-5px)", shadow:"x1"}}
        bg={bg}
    >   
        <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"}/>
        <Box p={4}>
            <Heading as={"h3"} size='md' mb={2}>
              {product.name}
            </Heading>
            <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
              INR. {product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton icon={<MdEdit/>} onClick={onOpen} colorScheme='blue'/>
                <IconButton icon={<MdDelete/>} onClick={()=>handleDeleteProduct(product._id)} colorScheme='red'/>
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <VStack>
                <Input 
                  placeholder='Product Name'
                  name='name'
                  value={updatedProduct.name}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                />
                <Input 
                  placeholder='Price'
                  name='image'
                  value={updatedProduct.image}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                />
                <Input 
                  placeholder='Image URL'
                  name='price'
                  value={updatedProduct.price}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                />
              </VStack>
            </ModalBody>   
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id,updatedProduct)}>Update</Button>
              <Button colorScheme='ghost' mr={3} onClick={onClose}>Cancel</Button>
            </ModalFooter>         
          </ModalContent>
        </Modal>
    </Box>
  )
}

export default ProductCart