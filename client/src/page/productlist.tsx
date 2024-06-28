import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ProductItem } from "../component/product-item";
import "./style.css";
import { Text, Input, Flex, useBreakpointValue } from "@chakra-ui/react";

interface Product {
  name: string;
  users: number;
  dashboards: number;
  category: string;
}
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Product | null>(null);
  const [input, setInput] = useState("");

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:3000/products");
    setProducts(data);
  };

  const handleDelete = async (name: String) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/products/${name}`
      );
      if (response.status === 200) {
        console.log("Product deleted successfully");
        fetchProducts();
        setFilter(null);
        setInput("");
      } else {
        console.error("Failed to delete product", response.status);
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const fetchFilteredProducts = async (name: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/${name}`
      );
      setFilter(response.data);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  console.log("1", filter);
  const debouncedFetchFilteredProducts = useCallback(
    debounce(fetchFilteredProducts, 300),
    []
  );
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.trim();
    setInput(name);
    if (name) {
      debouncedFetchFilteredProducts(name);
    } else {
      setFilter(null);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const inputVariant = useBreakpointValue({
    base: (
      <Input
        w="100%"
        placeholder="Search"
        onChange={handleOnChange}
        value={input}
        border="none"
        borderRadius="none"
        borderBottom="1px solid gray"
      />
    ),
    md: (
      <Input
        w="20%"
        placeholder="🔎 Search for name"
        onChange={handleOnChange}
        value={input}
        border="1px solid gray"
        borderRadius="5px"
      />
    ),
  });

  return (
    <Flex
      w={"100%"}
      h={"100%"}
      bg={"#f2f6fc"}
      flexDirection={"column"}
      justify={"start"}
      align={"center"}
      pt={20}
    >
      <Flex
        w={"80%"}
        flexDirection={"column"}
        align={"start"}
        justify={"start"}
        mb={2}
        display={{ base: "flex", md: "none" }}
      >
        <Text fontSize="4xl" as="b">
          Hi Sarah!
        </Text>
        <Text>here you can find your projects and dashboards</Text>
      </Flex>
      <Flex w={"80%"} justify={"end"}>
        {inputVariant}
      </Flex>

      {filter ? (
        <ProductItem item={filter} key={filter.name} onDelete={handleDelete} />
      ) : (
        products.map((product) => (
          <ProductItem
            key={product.name}
            item={product}
            onDelete={handleDelete}
          />
        ))
      )}
    </Flex>
  );
}
