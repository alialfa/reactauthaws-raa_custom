import { useTheme, View, Image, Text } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";

export function Header() {
  const { tokens } = useTheme();

  return (
    <View textAlign="center" padding={tokens.space.large}>
      <Link to="/">
        <Image
          alt="Amplify logo"
          src="https://docs.amplify.aws/assets/logo-dark.svg"
          //  src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
        />
      </Link>
    </View>
  );
}

export function Footer() {
  const { tokens } = useTheme();

  return (
    <View textAlign="center" padding={tokens.space.large}>
      <Text color={`${tokens.colors.neutral["80"]}`}>
        &copy; All Rights Reserved
      </Text>
    </View>
  );
}
