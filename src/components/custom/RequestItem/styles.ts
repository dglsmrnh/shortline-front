import styled from "styled-components";

import {
  CContainer,
  CCardText,
  CButton
} from "@coreui/react";

import theme from "src/components/global/theme";

export const Frame = styled(CContainer).attrs({
  color: 'success'
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.primary};
  margin: 0px;
  width: 99%;
  min-width: 99%;
  height: 100px;
  min-height: 100px;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: ${theme.colors.text};
`;

export const NameContainer = styled(CContainer)`
  align-items: center;
`;

export const Name = styled(CCardText)`
  font-family: 'Poppins';
  font-size: 24px;
  padding-left: 12px;
  width: 80%;
  align-items: center;
  margin-bottom: 0;
  text-align: start;
  font-weight: bold;
`;

export const Amount = styled(CCardText)`
  font-family: 'Poppins';
  font-size: 13px;
  opacity: 70%;
  padding-left: 14px;
`;

export const ButtonContainer = styled(CContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px;
  width: auto;
`;

export const InQueueButton = styled(CButton).attrs({
})`
  min-height: 50px;
  min-width: 70px;
  font-size: 9px;
  margin-right: 10px;
`;
