import { AxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import React, { useRef } from "react";
import { useMutation } from "react-query";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  ButtonGroup,
  Col,
  FlexboxGrid,
  Form,
  IconButton,
  Schema,
} from "rsuite";
import { ApiClientAtom, handleLogin } from "../Api/client";
import { userAtom } from "../Atoms/Auth";
import { BaseUrlScreen } from "../Components/BaseUrl";
import { BottomPadding } from "../utils/helpers";
import { EditOutline } from "@styled-icons/evaicons-outline";

export function Login() {
  const history = useHistory();
  const formref = useRef<any>();
  const [, setUser] = useAtom(userAtom);
  const [apiClient, setApiClient] = useAtom(ApiClientAtom);
  let fromPath = useLocation<string>().state;

  const model = Schema.Model({
    email: Schema.Types.StringType()
      .isEmail("Please enter a valid email address")
      .isRequired(),
    password: Schema.Types.StringType()
      .isRequired()
      .containsLowercaseLetter(
        "Password must contain atleast 1 lowercase letter"
      )
      .containsUppercaseLetter(
        "Password must contain atleast 1 uppercase letter"
      )
      .containsNumber("Password must contain atleast 1 digit")
      .minLength(8),
  });

  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const mutation = useMutation("login", async () => {
    let user = await handleLogin(
      formValue.email,
      formValue.password,
      apiClient!
    );
    return user;
  });

  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        {apiClient != undefined ? (
          <FlexboxGrid
            justify="center"
            align="middle"
            className="v-screen"
            as={motion.div}
            initial={{ y: 300, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                bounce: 0,
              },
            }}
            exit={{ y: -300, opacity: 0 }}
            key="loginScreen"
          >
            <FlexboxGrid.Item as={Col} colspan={20} lg={9} md={12} sm={16}>
              <BottomPadding>
                <h2>Welcome to your own Personal BatCave</h2>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Accessing HellFire at 
                  <ButtonGroup>
                    <Button appearance="subtle" style={{
                      maxWidth: "clamp(0px, 30vw, 300px)"
                    }}>
                      {apiClient!.baseUrl ?? "none"}
                    </Button>
                    <IconButton
                      appearance="subtle"
                      icon={<EditOutline size={14} />}
                      onClick={() => {
                        setApiClient(undefined);
                      }}
                    />
                  </ButtonGroup>
                </p>
              </BottomPadding>
              <Form
                fluid
                model={model}
                ref={formref}
                onChange={(val) => {
                  setFormValue({
                    email: val["email"],
                    password: val["password"],
                  });
                }}
              >
                <Form.Group controlId="email">
                  <Form.ControlLabel>Email</Form.ControlLabel>
                  <Form.Control name="email"></Form.Control>
                  <Form.HelpText>Email is required</Form.HelpText>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.ControlLabel>Password</Form.ControlLabel>
                  <Form.Control
                    name="password"
                    // @ts-ignore
                    type="password"
                  />
                </Form.Group>
                <Button
                  block
                  appearance="primary"
                  size="lg"
                  type="submit"
                  onClick={async () => {
                    if (formref.current.check()) {
                      try {
                        let res = await mutation.mutateAsync();
                        console.log(res, fromPath);
                        setUser(res);
                        history.replace(fromPath);
                      } catch (error) {
                        console.log(error);
                        let err: AxiosError = error;
                        toast(err.response?.data.data.message ?? "Error");
                      }
                    }
                  }}
                  loading={mutation.isLoading}
                >
                  Login
                </Button>
              </Form>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        ) : (
          <BaseUrlScreen />
        )}
      </AnimatePresence>
    </div>
  );
}
