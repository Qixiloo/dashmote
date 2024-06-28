import {
  Flex,
  Avatar,
  Text,
  Button,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import "./style.css";
import { isDisabled } from "@testing-library/user-event/dist/utils";

interface Product {
  name: string;
  users: number;
  dashboards: number;
  category: string;
}

interface ProductItemProps {
  item: Product;
  onDelete: (name: String) => void;
}

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }:{isOpen: boolean, onClose: () => void, onConfirm: () => void}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete this product? This action cannot be
          undone.
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onConfirm} >
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export function ProductItem({ item, onDelete}: ProductItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const avatarBg = getAvatarColor(item.category);

  const handleDeleteConfirm = () => {
    onDelete(item.name);
    onClose(); // Close the modal after confirmation
  };

  function getAvatarColor(category: String) {
    if (category === "C") {
      return "#00cc74";
    } else if (category === "F") {
      return "#b37feb";
    }
    return "#1990ff";
  }

  return (
    <Flex
      border="1px solid #eee"
      borderLeft={`8px solid ${avatarBg}`}
      width={"80%"}
      p={4}
      borderRadius={"10px"}
      bg="white"
      alignItems="center"
      justifyContent="space-between"
      mt={2}
    >
      <Flex
        alignItems="center"
        flex="1"
        mr={4}
        justifyContent={"space-between"}
      >
        <Flex alignItems="center" justifyContent={"space-between"}>
          <Avatar
            name={item.category}
            size="lg"
            borderRadius="full"
            mr={4}
            bg={avatarBg}
          />
          <Text fontSize="xl" fontWeight="bold">
            {item.name}
          </Text>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent={"space-evenly"}
          gap={20}
          display={{ base: "none", md: "flex" }}
        >
          <Text>{item.users} users</Text>
          <Box
            bg="rgba(77, 219, 158, 0.2)"
            border="1px solid #4ddb9e"
            px={2}
            py={1}
            borderRadius={"md"}
            color={"#4ddb9e"}
          >
            {item.dashboards} dashboards
          </Box>
          <Button colorScheme="red" onClick={onOpen}>
            Delete
          </Button>
          <DeleteConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleDeleteConfirm}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
