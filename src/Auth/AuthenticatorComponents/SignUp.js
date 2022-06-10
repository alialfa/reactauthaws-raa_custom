import { useTheme, View, Heading } from "@aws-amplify/ui-react";
import { Button, useAuthenticator } from "@aws-amplify/ui-react";

export function SignUpHeader() {
  const { tokens } = useTheme();

  return (
    <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
      Create a new account
    </Heading>
  );
}

export function SignUpFooter() {
  const { toSignIn } = useAuthenticator();

  return (
    <View textAlign="center">
      <Button
        fontWeight="normal"
        onClick={toSignIn}
        size="small"
        variation="link"
      >
        Back to Sign In
      </Button>
    </View>
  );
}
