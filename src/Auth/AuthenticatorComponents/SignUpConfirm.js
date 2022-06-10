import { useTheme, Text, Heading } from "@aws-amplify/ui-react";

export function CSUHeader() {
  const { tokens } = useTheme();
  return (
    // <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
    <Heading
      padding={`${tokens.space.xl} 0 0 ${tokens.space.relative}`}
      level={3}
    >
      We Emailed You
    </Heading>
  );
}

export function CSUFooter() {
  return <Text>Footer info</Text>;
}
