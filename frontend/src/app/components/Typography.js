import { Box, styled } from '@mui/material';
import clsx from 'clsx';

const StyledBox = styled(Box)(({ theme, textTransform, ellipsis }) => ({
  textTransform: textTransform || 'none',
  whiteSpace: ellipsis ? 'nowrap' : 'normal',
  overflow: ellipsis ? 'hidden' : '',
  textOverflow: ellipsis ? 'ellipsis' : '',
}));



export const Small = ({ children, className, ellipsis, textTransform, ...props }) => {
  return (
    <StyledBox
      textTransform={textTransform}
      ellipsis={ellipsis}
      className={clsx({
        [className || '']: true,
      })}
      component="small"
      fontSize="12px"
      fontWeight="500"
      lineHeight="1.5"
      {...props}
    >
      {children}
    </StyledBox>
  );
};

export const Span = ({ children, className, ellipsis, textTransform, ...props }) => {
  return (
    <StyledBox
      textTransform={textTransform}
      ellipsis={ellipsis}
      className={clsx({
        [className || '']: true,
      })}
      component="span"
      lineHeight="1.5"
      {...props}
    >
      {children}
    </StyledBox>
  );
};

