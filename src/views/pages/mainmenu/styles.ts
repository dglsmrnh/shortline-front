import styled from "styled-components";
import {
  CContainer,
  CCardText,
  CImage,
  CButton
} from "@coreui/react";
import theme from "src/components/global/theme";
import iconPng from '../../../assets/images/iconpng.png';
import avatar7 from '../../../assets/images/avatars/7.jpg';

interface QueueProps {
  title: string,
  people: string
}

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
`;

export const Body = styled(CContainer)`
  font-family: 'Poppins';
`;

export const QueueListContainer = styled(CContainer)`
  background-color: ${theme.colors.shapeBackground};
  margin: 25px;
  width: 43%;
  padding: 10px;
  border-radius: 5px;
  border-style: solid;
  border-color: ${theme.colors.text};
  border-width: 1px;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const ListTitle = styled(CCardText)`
  text-align: center;
  font-family: 'Poppins';
  font-size: 24px;
`;

export const QueueInsideList = styled(CContainer)`
`;

export const Graphic = styled(CContainer)`

`;

export const Button = styled(CButton).attrs({

})`

`;
