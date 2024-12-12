import { Button, Container,Flex,HStack,Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CiSquarePlus } from "react-icons/ci";

function NavBar() {
    const {colorMode,toggleColorMode} = useColorMode()
    const location = useLocation()

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex 
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base:"column",
                    sm:"row"
                }}
            >
                <Text
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text'
                    fontSize='6xl'
                    fontWeight='extrabold'
                >
                    <Link to={"/"}>Product Store 🛒</Link>
                </Text>
                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button fontSize={20}>
                            <CiSquarePlus/>
                        </Button>
                    </Link>
                    <Link to={location.pathname === "/" ? "/" : "/create"}>
                        <Button onClick={toggleColorMode}>
                            {colorMode === "light" ? "🌙" : "☀️"}
                        </Button>
                    </Link>
                </HStack>
            </Flex>
        </Container>
    )
}

export default NavBar