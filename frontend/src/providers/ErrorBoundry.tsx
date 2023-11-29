import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import React, { Component, ReactNode } from "react";

type Props = { children: ReactNode };

type State = {};

export default class ErrorBoundry extends Component<Props, State> {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  static componentDidCatch(error, info) {
    const errorMessage = error.message;
    if (errorMessage) {
    //   toast.error(errorMessage)
    console.log({error,info})
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box className="flex items-start justify-center">
          <Typography variant="h4" color={"error"}>
            Error
          </Typography>
        </Box>
      );
    }
    return <>{this.props.children}</>;
  }
}
