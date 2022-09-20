import styled from "styled-components";
import {
  CButton,
  CCard, CCardText, CContainer
} from "@coreui/react";

import theme from "src/components/global/theme";

export const Container = styled(CContainer)`
  height: 100%;
  width: 100%;
`;

export const OuterCard = styled(CCard)`
  background-color: ${theme.colors.background};
  height: 99%;
  width: 100%;
  align-items: center;
`;

export const QueueInfoContainer = styled(CCard)`
  background-color: ${theme.colors.background};
  height: 20%;
  width: 100%;
`;

export const EstablishmentName = styled(CCardText)`
  color: ${theme.colors.text};
  font-family: 'Poppins';
  font-size: 20px;
  text-align: center;
  margin-bottom: 5px;
`;

export const PeopleAmount = styled(CCardText)`
  color: ${theme.colors.text};
  opacity: 80%;
  font-family: 'Poppins';
  font-size: 16px;
  text-align: center;
  margin-bottom: 2px;
`;

export const WaitAmount = styled(CCardText)`
  color: ${theme.colors.text};
  opacity: 80%;
  font-family: 'Poppins';
  font-size: 12px;
  text-align: center;
`;

export const EnterButton = styled(CButton).attrs({color: "success"})`
  width: 95%;
  height: 10%;
  margin: 10px 0px;
`;
