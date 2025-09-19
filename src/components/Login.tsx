import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { FaUserCheck } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Flex justifyContent="center" boxSize="fit-content" mx="auto" p={5}>
        <Card size={{ base: "sm", md: "lg" }} p={4}>
          <Heading size="md" textAlign="center">
            ログイン
          </Heading>
          <CardBody>
            <form
              onSubmit={() => {}} //仮で関数設置（処理内容は未記載）
            >
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUserCheck color="gray" />
                </InputLeftElement>
                <Input
                  autoFocus
                  type="email"
                  placeholder="メールアドレスを入力"
                  name="email"
                  required
                  mb={2}
                  onChange={() => {}} //仮で関数設置（処理内容は未記載）
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <RiLockPasswordFill color="gray" />
                </InputLeftElement>
                <Input
                  type="password"
                  placeholder="パスワードを入力"
                  name="password"
                  required
                  mb={2}
                  onChange={() => {}} //仮で関数設置（処理内容は未記載）
                />
              </InputGroup>
              <Box mt={4} mb={2} textAlign="center">
                <Button
                  //isLoading={loading}//ローディング状態の定義、後ほど設定するので、一旦コメントアウト
                  loadingText="Loading"
                  spinnerPlacement="start"
                  type="submit"
                  colorScheme="green"
                  width="100%"
                  mb={2}
                >
                  ログイン
                </Button>
                <Button
                  colorScheme="green"
                  width="100%"
                  variant="outline"
                  onClick={() => {}}
                >
                  新規登録
                </Button>
              </Box>
              <Box mt={4} mb={2} textAlign="center">
                <Stack spacing={3}>
                  <Button
                    colorScheme="green"
                    width="100%"
                    variant="ghost"
                    onClick={() => {}}
                  >
                    パスワードをお忘れですか？
                  </Button>
                </Stack>
              </Box>
            </form>
          </CardBody>
        </Card>
      </Flex>

      <Link to="/">Back to Home</Link>
    </>
  );
};
export default Login;
