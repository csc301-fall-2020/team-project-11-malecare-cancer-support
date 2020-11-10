import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainPageContainer = styled.div`
  text-align: center;
`;

export const MainTitleLarge = styled.div`
  color: #d54e54;
  font-size: 60px;
`;

export const MainTitle = styled.div`
  color: #d54e54;
  font-size: 48px;
`;

export const MainSubTitleLarge = styled.div`
  color: #d54e54;
  font-size: 36px;
`;

export const MainSubTitle = styled.div`
  color: #d54e54;
  font-size: 24px;
`;

export const Space = styled.div`
  ${({ width }) => width && `width: ${width};`}
  ${({ height }) => height && `height: ${height};`}
`;

export const PrimaryButton = styled.button`
  border: 2px solid #d54e54;
  border-radius: 50px;
  background-color: #d54e54;
  color: #ffffff;
  font-size: 30px;
  width: 320px;
  height: 50px;
`;

export const SecondaryButton = styled.button`
  border: 2px solid #d54e54;
  border-radius: 50px;
  background-color: #ffffff;
  color: #d54e54;
  font-size: 30px;
  width: 320px;
  height: 50px;
`;

export const NavBarContainer = styled.nav`
  display: flex;
  justify-content: spade-around;
  align-items: center;
  min-height: 60px;
  background-color: #d54e54;
  color: #ffffff;
  padding: 0 12px;
  font-size: 24px;
`;

export const NavLinkContainer = styled.ul`
  width: 30%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
`;

export const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
`;

export const ErrorMessageContainer = styled.div`
  color: #eb901a;
  font-size: 24px;
`;