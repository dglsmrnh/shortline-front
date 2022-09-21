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

export const Container = styled(CContainer)`
  width: 100%;
  height: 100%;
`;

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

export const Body = styled(CContainer)`
  font-family: 'Poppins';
  display: flex;
  flex-direction: row;
  margin-bottom: 78px;
`;

export const QueueListContainer = styled(CContainer)`
  background-color: ${theme.colors.shapeBackground};
  margin-left: 100px;
  margin-right: 20px;
  width: 42%;
  height: 650px;
  padding: 10px;
  border-radius: 5px;
  border-style: solid;
  border-color: ${theme.colors.text};
  border-width: 1px;
  display: flex;
  flex-direction: column;
`;

export const ListTitle = styled(CCardText)`
  text-align: center;
  font-family: 'Poppins';
  font-size: 24px;
  margin-top: 13px;
  margin-bottom: 25px;
`;

export const QueueInsideList = styled(CContainer)`
  display: flex;
  background-color: ${theme.colors.innerBackground};
  border-radius: 5px;
  border-style: solid;
  border-color: ${theme.colors.text};
  border-width: 1px;
  margin-bottom: 10px;
  padding: 0px;
  align-items: center;
  flex-direction: column;
  min-height: 69%;
  max-height: 69%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const ChartsContainer = styled(CContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 42%;
  height: 60%;
  margin-left: 20px;
`;

export const Chart = styled(CChart)`
  margin-bottom: 25px;
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

export const QrCodeContainer = styled(UserButtonsContainer)`
`;

export const GenerateQrContainer = styled(CContainer)`
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const Button = styled(CButton).attrs({
  color: 'success'
})`
  height: 12%;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const Modal = styled(CModal)`
  
`;

export const CardText = styled(CCardText)`
  margin-bottom: 1px;
`;
