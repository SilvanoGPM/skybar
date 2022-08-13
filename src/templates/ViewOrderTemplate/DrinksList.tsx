import { OneLineText } from '$components/ui/OneLineText';
import { Badge, Box, Flex, Image, LightMode, VStack } from '@chakra-ui/react';

interface Drink {
  name: string;
  uuid: string;
  picture: string;
  amount: number;
}

interface DrinkListProps {
  drinks: Record<string, Drink>;
}

export function DrinkList({ drinks }: DrinkListProps) {
  return (
    <VStack w="full" spacing="4">
      {Object.keys(drinks).map((key) => {
        const drink = drinks[key];

        return (
          <Flex
            key={drink.uuid}
            align="center"
            justify="space-between"
            w="full"
          >
            <Flex direction="column" justify="space-between">
              <OneLineText
                fontSize={['xl', '2xl']}
                fontWeight="bold"
                maxW={['150px', '250px', '350px']}
              >
                {drink.name}
              </OneLineText>

              <OneLineText color="gray.500" maxW={['120px', '200px', '350px']}>
                {drink.uuid}
              </OneLineText>
            </Flex>

            <Box pos="relative">
              <Image
                w="24"
                h="20"
                rounded="xl"
                objectFit="cover"
                src={drink.picture}
              />

              <LightMode>
                <Badge
                  pos="absolute"
                  top="-2"
                  right="-2"
                  colorScheme="brand"
                  color="white"
                  rounded="full"
                  w="6"
                  h="6"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {drink.amount}
                </Badge>
              </LightMode>
            </Box>
          </Flex>
        );
      })}
    </VStack>
  );
}
