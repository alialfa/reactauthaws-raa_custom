import { useTheme, View, Heading } from "@aws-amplify/ui-react";
import { Button, useAuthenticator } from "@aws-amplify/ui-react";

export function SignInHeader() {
  const { tokens } = useTheme();

  return (
    <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
      Sign in to your account
    </Heading>
  );
}

export function SignInFooter() {
  const { toResetPassword } = useAuthenticator();

  return (
    <View textAlign="center">
      <Button
        fontWeight="normal"
        onClick={toResetPassword}
        size="small"
        variation="link"
      >
        Reset Password
      </Button>
    </View>
  );
}
