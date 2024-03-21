import { Box, Text } from "@chakra-ui/react";

const OrdersComp = () => {
  const orders = [
    { id: 1, product: "Product 1", quantity: 2 },
    { id: 2, product: "Product 2", quantity: 1 },
    { id: 3, product: "Product 3", quantity: 3 },
  ];

  return (
    <Box>
      {orders.map((order) => (
        <Box key={order.id} mb={4}>
          <Text>Order ID: {order.id}</Text>
          <Text>Product: {order.product}</Text>
          <Text>Quantity: {order.quantity}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default OrdersComp;
