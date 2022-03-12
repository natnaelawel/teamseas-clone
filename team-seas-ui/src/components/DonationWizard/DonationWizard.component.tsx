import {
  Box,
  Button,
  VStack,
  Heading,
  useRadio,
  useRadioGroup,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useMutation } from "urql";
import * as yup from "yup";
import { InputField } from "../../widgets/form/InputField";
import { TextareaField } from "../../widgets/form/TextAreaField";

type Props = {};

const options: { text: string; value: number }[] = [
  { text: "5 Pounds", value: 5 },
  { text: "20 Pounds", value: 20 },
  { text: "50 Pounds", value: 50 },
  { text: "200 Pounds", value: 200 },
];

const detailsSchema = yup.object().shape({
  displayName: yup.string().required("Please enter a display name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  mobile: yup.string().nullable(),
  team: yup.string().nullable(),
  message: yup.string().nullable(),
});

const CreateDonation = `
    mutation Mutation($createDonationInput: CreateDonationInput!) {
        createDonation(createDonationInput: $createDonationInput) {
        count
        displayName
        email
        mobile
        team
        message
        id
        createdAt
        }
    }
`;

const DonationWizardLayout = (props: Props) => {
  const [pageStep, setPageStep] = useState(0);

  const [poundValue, setPoundValue] = useState(5);
  const { getRootProps, getRadioProps, setValue, value } = useRadioGroup({
    name: "pound size",
    defaultValue: options[0].value,

    onChange: (v) => {
      setPoundValue(parseInt(v));
    },
  });

  const group = getRootProps();

  const Step1Layout = () => {
    function RadioCard(props: any) {
      const { getInputProps, getCheckboxProps } = useRadio(props);

      const input = getInputProps();
      const checkbox = getCheckboxProps();
      const isChecked = props.value == poundValue;
      return (
        <Box as="label">
          <input {...input} checked={props.value == poundValue} />
          <Box
            {...checkbox}
            cursor="pointer"
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            bg={isChecked ? "blue.600" : ""}
            color={isChecked ? "white" : ""}
            borderColor={isChecked ? "blue.600" : ""}
            _focus={{
              boxShadow: "outline",
            }}
            px={5}
            py={3}
          >
            {props.children}
          </Box>
        </Box>
      );
    }

    const handleInputField = () => {
      setValue(-1);
    };

    return (
      <Box>
        <Heading textAlign="center">JOIN #TEAMPOUNDS!</Heading>
        <Heading my={2} textAlign="center" size="md">
          $1 remove 1 pound trash
        </Heading>

        <Box p={5}>
          <SimpleGrid {...group} columns={2} gap={6}>
            {options.map((option: { text: string; value: number }) => {
              const radio = getRadioProps({ ...option });
              return (
                <RadioCard key={option.value} {...radio}>
                  {option.value}
                </RadioCard>
              );
            })}
          </SimpleGrid>
          <NumberInput
            my={6}
            defaultValue={poundValue}
            value={poundValue}
            onChange={(valueString) => setPoundValue(parseInt(valueString))}
            min={1}
            max={1000}
          >
            <NumberInputField onFocus={handleInputField} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>

        <VStack spacing={3}>
          <Button
            isFullWidth
            colorScheme="orange"
            size="lg"
            borderRadius="full"
            onClick={pageStep === 0 ? handleNext : () => {}}
            type="submit"
          >
            {pageStep === 0 ? "Next" : "Submit"}
          </Button>

          <Button
            hidden={pageStep === 0}
            isFullWidth
            colorScheme="orange"
            size="lg"
            borderRadius="full"
            variant="ghost"
            onClick={handlePrev}
          >
            Previous
          </Button>
        </VStack>
      </Box>
    );
  };

  const Step2Layout = () => {
    const [formData, setFormData] = useState({
      count: poundValue,
      displayName: "",
      email: "",
      mobile: "",
      team: "",
      message: "",
    });

    const [createDonationResult, createDonation] = useMutation(CreateDonation);

    const submit = (values: any) => {
      console.log("values are ", values);
      createDonation({ createDonationInput: values }).then((result) => {
        if (result.error) {
          console.error("Oh no!", result.error);
        } else {
          setPageStep((pageStep) => pageStep + 1);
        }
      });
    };
    return (
      <Box>
        {JSON.stringify(poundValue)}

        <Formik
          initialValues={formData}
          onSubmit={submit}
          validationSchema={detailsSchema}
        >
          {(formikProps) => (
            <Form>
              <VStack spacing={4} align="stretch">
                <Heading as="h3" size="md">
                  Details
                </Heading>
                <InputField
                  label="Display Name"
                  name="displayName"
                  placeholder="Display Name"
                />

                <InputField
                  label="Email Address"
                  name="email"
                  placeholder="Email"
                />

                <InputField
                  label="Mobile Phone"
                  name="mobile"
                  placeholder="Mobile Phone"
                />

                <InputField label="Team" name="team" placeholder="Team name" />

                <TextareaField
                  label="Message"
                  name="message"
                  placeholder="My #TeamSeas message is..."
                />
              </VStack>
              <hr />

              <VStack my={5} spacing={3}>
                <Button
                  isFullWidth
                  colorScheme="orange"
                  size="lg"
                  borderRadius="full"
                  type="submit"
                >
                  Submit
                </Button>

                <Button
                  hidden={pageStep === 0}
                  isFullWidth
                  colorScheme="orange"
                  size="lg"
                  borderRadius="full"
                  variant="ghost"
                  onClick={handlePrev}
                >
                  Previous
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    );
  };

  const Step3Layout = () => {
    return (
      <Box textAlign="center">
        <Heading>Congratulation!</Heading>
        Thanks for Supporting
      </Box>
    );
  };

  const handleNext = () => {
    setPageStep((pageStep) => pageStep + 1);
  };

  const handlePrev = () => {
    setPageStep((pageStep) => pageStep - 1);
  };

  const pages = [<Step1Layout />, <Step2Layout />, <Step3Layout />];

  return (
    <div>
      <Box boxShadow="dark-lg" p={8} borderRadius="xl" minW="sm">
        <Box my={5}>{pages[pageStep]}</Box>
      </Box>
    </div>
  );
};

export default DonationWizardLayout;
