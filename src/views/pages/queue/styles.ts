import styled from "styled-components";

import {
  CContainer,
  CImage,
  CCardText,
  CCard,
  CButton
} from "@coreui/react";

import theme from "src/components/global/theme";
import iconPng from '../../../assets/images/iconpng.png';
import avatar7 from '../../../assets/images/avatars/7.jpg';

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
  min-height: 87%;
  max-height: 87%;
  overflow-y: scroll;
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
  justify-content: space-between;
  margin-bottom: 78px;
`;

export const QueueContainer = styled(CCard)`
  background-color: ${theme.colors.shapeBackground};
  margin-left: 100px;
  margin-right: 20px;
  width: 42%;
  height: 60vh;
  padding: 10px;
  border-radius: 5px;
  border-style: solid;
  border-color: ${theme.colors.text};
  border-width: 1px;
  display: flex;
  flex-direction: column;
`;

export const RightSideContainer = styled(CContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 42%;
  height: 60vh;
  margin-left: 20px;
  margin-right: 100px;
`;

export const RequestsContainer = styled(CCard)`
  background-color: ${theme.colors.shapeBackground};
  width: 100%;
  height: 30vh;
  border-radius: 5px;
  border-style: solid;
  border-color: ${theme.colors.text};
  border-width: 1px;
  display: flex;
  flex-direction: column;
`;

export const CloseButton = styled(CButton)`

`;

export const DeleteButton = styled(CButton)`

`;
