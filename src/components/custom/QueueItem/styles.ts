import { CCardText, CContainer, CImage } from "@coreui/react";
import styled from "styled-components";
import theme from "src/components/global/theme";

import personIcon from '../../../assets/images/person.png';

export const Container = styled(CContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary};
  margin: 0px;
  width: 90%;
  height: 75px;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: ${theme.colors.text};
`;

export const Title = styled(CCardText)`
  font-family: 'Poppins';
  font-size: 24px;
  width: 80%;
  align-items: center;
  margin-bottom: 0;
`;

export const AmountContainer = styled(CContainer)`
  display: flex;
  flex-direction: row;
  width: 20%;
  align-items: center;
`
;
export const Amount = styled(CCardText)`
  font-family: 'Poppins';
  font-size: 24px;
  margin-right: 5px;
  align-items: center;
  margin-bottom: 0;
`
;
export const Icon = styled(CImage).attrs({
  src: personIcon,
  height: '20',
  width: '20'
})`

`
;
