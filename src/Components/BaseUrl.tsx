import { motion } from "framer-motion";
import { useAtom } from "jotai";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { Button, FlexboxGrid, Input, Form, Schema, InputGroup } from "rsuite";
import { ApiClient, ApiClientAtom } from "../Api/client";
import { BottomPadding } from "../utils/helpers";

export function BaseUrlScreen() {
  const model = Schema.Model({
    baseUrl: Schema.Types.StringType().pattern(/^(?!https?).*$/, "Please dont enter the protocol (https:// or http://)").pattern(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      "This is not a valid url"
    ).isRequired("We can't proceed without the URL!!"),
  });
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [, setApiClient] = useAtom(ApiClientAtom);
  const ref = useRef<any>();

  return (
    <FlexboxGrid
      align="middle"
      justify="center"
      className="v-screen"
      as={motion.div}
      key="baseUrlScreen"
    >
      <FlexboxGrid.Item colspan={8}>
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              bounce: 0,
            },
          }}
          exit={{ y: -300, opacity: 0 }}
        >
          <BottomPadding>
            <motion.h2>Where is your Hellfire hosted?</motion.h2>
          </BottomPadding>

          <Form
            model={model}
            fluid
            onChange={(formValue) => {
                console.log(formValue)
              setBaseUrl("https://" + formValue["baseUrl"]);
            }}
            ref={ref}
          >
            <Form.Group controlId="url">
              <InputGroup
                style={{
                  width: "100%",
                }}
              >
                <InputGroup.Addon>https://</InputGroup.Addon>
                <Form.Control name="baseUrl"></Form.Control>
              </InputGroup>
              <Form.HelpText>Enter the complete url</Form.HelpText>
            </Form.Group>
            <Button
              block
              appearance="primary"
              onClick={() => {
                if (ref.current.check()) {
                  setApiClient(new ApiClient(baseUrl));
                }
              }}
            >
              Unleah HellFire!
            </Button>
          </Form>
        </motion.div>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
