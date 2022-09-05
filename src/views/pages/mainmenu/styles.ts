import styled from "styled-components";
import {
  CContainer,
  CCardImage,
  CCardText
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import '../../../scss/style.scss';
import theme from "src/components/global/theme.ts";

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
  padding: 50px;
`;

export const MainIcon = styled(CIcon)`
  font-size: 120px;
`;

export const Title = styled(CCardText)`
  font-family: ${theme.fonts.bold};
  font-size: 40px;
`;

export const UserIcon = styled(CIcon)`
  font-size: 80px;
  border-radius: 40px;
`;

export const Body = styled(CContainer)`

`;

export const QueueList = styled(CContainer)`

`;
