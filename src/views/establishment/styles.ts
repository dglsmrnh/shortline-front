import styled from "styled-components";
import {
  CButton,
  CCard, CCardText, CContainer
} from "@coreui/react";

import theme from "src/components/global/theme";

export const EnterButton = styled(CButton).attrs({color: "success"})`
  width: 95%;
  height: 10%;
  margin: 10px 0px;
`;
