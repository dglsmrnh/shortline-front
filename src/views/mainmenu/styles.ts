import styled from "styled-components";
import {
  CContainer,
  CCardText,
  CImage,
  CButton,
  CModal
} from "@coreui/react";
import theme from "src/components/global/theme";
import iconPng from '../../assets/images/iconpng.png';
import avatar7 from '../../assets/images/avatars/7.jpg';
import { CChart } from "@coreui/react-chartjs";

import CIcon from "@coreui/icons-react";


export const Header = styled(CContainer)`
  background-color: ${theme.colors.primary};
  width: 100%;
  padding: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-color: ${theme.colors.text};
  border-width: 1px;
  border-bottom: solid;
  border-radius: 5px;
  margin-bottom: 77px;
`;

export const MainIcon = styled(CImage).attrs({
  src: iconPng,
  width: "100",
  height: "100"
})`
  font-size: 120px;
`;

export const Title = styled(CCardText)`
  font-family: 'Poppins';
  font-weight: bold;
  font-size: 40px;
`;

export const UserIcon = styled(CImage).attrs({
  src: avatar7,
  width: "80",
  height: "80"
})`
  border-radius: 40px;
  border-style: solid;
  border-width: 1px;
  border-color: ${theme.colors.text};
  cursor: pointer;
`;

export const UserButtonsContainer = styled(CContainer)`
  font-family: 'Poppins';
  width: 90vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Button = styled(CButton).attrs({
  color: 'success'
})`
  height: 12%;
  width: 90%;
  margin: 15px;
`;

export const Modal = styled(CModal)`

`;
