import { Box, HStack, Link } from "@chakra-ui/layout"
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Button } from "@chakra-ui/button"
import { useColorMode } from "@chakra-ui/color-mode"
import * as React from 'react'

type Props = {}

const Navbar: React.FC<Props> = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
       <HStack>
           <Link href="/">Home</Link>
           <Link href="/about">About</Link>
           <Button onClick={toggleColorMode}>
                {
                    colorMode === 'light' ?
                    <SunIcon /> :
                    <MoonIcon />
                }
           </Button>
       </HStack>
    )
}

export default Navbar
