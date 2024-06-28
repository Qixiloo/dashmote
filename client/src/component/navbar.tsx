import {
  Box,
  Flex,
  Avatar,
  IconButton,
  Text,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, BellIcon } from "@chakra-ui/icons";

interface Props {
  children: React.ReactNode;
}

const NavLink = (props: Props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "#abdbe3",
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        w="100%"
        bg={'#f2f6fc'}
        borderBottom={"1px solid grey"}
        px={4}
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={{ base: "space-between", md: "flex-end" }}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <Flex alignItems={"center"} justifyContent={"end"} gap={2}>
            <BellIcon
              fontSize="md"
              border={"black"}
              bg={"transparent"}
              cursor={"pointer"}
            />
            <Text size={"sm"} display={{ base: "none", md: "inline-flex" }}>
              Sarah Green
            </Text>

            <Avatar
              size={{ base: "xs", md: "sm" }}
              src={
                "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              }
            />
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink>Sarah Green</NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
