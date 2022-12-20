import {
  Input,
  Flex,
  Stack,
  Box,
  Grid,
  Textarea,
} from "@raidguild/design-system";

export default function StepOne(props: any) {
  const formFields = [
    {
      label: "What is your name?",
      name: "name",
      type: "text",
      placeholder: "Your Name",
    },
    {
      label: "What is your email?",
      name: "email",
      type: "email",
      placeholder: "Your Email",
    },
    {
      label: "Your Bio",
      name: "bio",
      type: "textarea",
      placeholder: "A short introduction",
    },
    {
      label: "What is your Discord handle?",
      name: "discord",
      type: "text",
      placeholder: "Your Discord",
    },
    {
      label: "What say of your Github Handle?",
      name: "github",
      type: "text",
      placeholder: "Your Github",
    },
    {
      label: "and yon well flown Tweeter Bird?",
      name: "twitter",
      type: "text",
      placeholder: "Your Twitter",
    },
    {
      label: "and your Telegram?",
      name: "telegram",
      type: "text",
      placeholder: "Your Telegram",
    },
  ];

  return (
    <Flex
      w="100%"
      direction="column"
      px={{ base: "2rem", lg: "5rem" }}
      py="2rem"
    >
      <Grid sx={{ gridTemplateColumns: `1fr 1fr`, gap: `2rem` }}>
        {formFields.map((field, index) => {
          if (field.type == "textarea") {
            return (
              <Box key={index} sx={{ gridColumn: `span 2` }}>
                <Textarea
                  name={field.name}
                  localForm={props?.localForm}
                  label={field.label}
                  placeholder={field.placeholder}
                  variant="outline"
                />
              </Box>
            );
          }
          return (
            <Input
              key={index}
              type={field.type}
              name={field.name}
              localForm={props?.localForm}
              label={field.label}
              placeholder={field.placeholder}
            />
          );
        })}
      </Grid>
    </Flex>
  );
}
