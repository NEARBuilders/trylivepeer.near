const StyledButton = styled.button`
  display: flex;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 40px;

  border-radius: 12px;
  border: 1px solid #dbdbdb;
  background: #fff;

  color: #171717;

  /* Poppins/Text/S - 14px/Medium */
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  letter-spacing: -0.14px;

  transition: all 300ms;
  &:hover {
    opacity: 0.8;
  }

  ${(props) =>
    props.type === "icon" &&
    `
    padding: 4px 12px;
  `}

  ${(props) =>
    props.variant === "primary" &&
    `
    color: white;
    background: #171717;
  `}

  ${(props) =>
    props.variant === "tab" &&
    `
    border: 1px solid #E2E2E2;
    background: #F8F8F8;
  `}
`;

const Button = ({ children, onClick, type, variant, ...passProps }) => {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      variant={variant}
      {...passProps}
    >
      {children}
    </StyledButton>
  );
};

return { Button };
