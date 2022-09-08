import { CCardText, CContainer, CImage } from "@coreui/react";
import styled from "styled-components";
import theme from "src/components/global/theme.ts";

import personIcon from '../../../assets/images/person.png';

export const Container = styled(CContainer)`
  display: flex;
  flex-direction: row;
  background-color: ${theme.colors.primary};
  width: 100%;
`;

export const Title = styled(CCardText)`
  font-family: 'Poppins';
`
;
export const AmountContainer = styled(CContainer)`
  display: flex;
  flex-direction: row;
`
;
export const Amount = styled(CCardText)`
  font-family: 'Poppins';
`
;
export const Icon = styled(CImage).attrs({
  src: personIcon,
  height: '20'
})`

`
;
