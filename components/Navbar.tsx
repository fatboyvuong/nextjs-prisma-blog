import { Box, Center, HStack, Link } from "@chakra-ui/layout"
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Button } from "@chakra-ui/button"
import { useColorMode } from "@chakra-ui/color-mode"
import * as React from 'react'

type Props = {}

const Navbar: React.FC<Props> = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Center>
            <HStack w="100vh" padding="4">
                <Link marginX="4" href="/">Home</Link>
                <Link marginX="4" href="/about">About</Link>
                <Button marginX="4" onClick={toggleColorMode}>
                        {
                            colorMode === 'light' ?
                            <SunIcon /> :
                            <MoonIcon />
                        }
                </Button>
            </HStack>
        </Center>
    )
}

export default Navbar
