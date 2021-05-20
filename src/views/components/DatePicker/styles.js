import styled from '@emotion/styled';
// import LinkText from '../LinkText';
import FillButton from '../FillButton';
import { CALENDAR } from '../../../constants/zIndex';

export const WeekDayLabel = styled('div')(({ inMonth, theme, isSunday }) => ({
  display: 'inline-block',
  width: 32,
  height: 32,
  textAlign: 'center',
  color: isSunday ? theme.errorTextColor : theme.cardContentTextColor,
  opacity: !inMonth && 0.4,
  textTransform: 'uppercase',
  padding: '6px 0',
  fontSize: 16
}));

export const DateLabel = styled('div')({
  cursor: 'pointer',
  display: 'inline-block',
  padding: '4.95px 17.5px'
});

export const HighlightedDate = styled(WeekDayLabel)(({ theme }) => ({
  fontWeight: 800,
  color: theme.clickableTextColor
}));

export const TodayLabel = styled(WeekDayLabel)(({ theme, isSunday }) => ({
  borderRadius: 22,
  backgroundColor: theme.clickableTextColor,
  color: theme.white
}));

export const MonthLabel = styled('div')(({ theme }) => ({
  textAlign: 'center',
  color: theme.datePickerMonthYear,
  fontSize: 16,
  fontWeight: 500,
  fontFamily: 'SamsungOne',
  lineHeight: '21px'
}));

export const CalendarContainer = styled('div')(({ theme }) => ({
  minWidth: 516,
  height: 428,
  border: `1px solid ${theme.eventBorderColor}`,
  boxShadow: '0 6px 12px 0 rgba(128, 170, 211, 0.5)',
  borderRadius: 26,
  padding: '36px 22.5px',
  backgroundColor: theme.white,
  position: 'absolute',
  zIndex: CALENDAR,
  top: 50
}));

export const CalendarHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 15.55
});

export const CalendarFooter = styled('div')({
  display: 'flex',
  marginTop: 9
});

export const LinkButton = styled('a')(({ theme }) => ({
  height: 36,
  color: theme.datePickerMonthYear,
  fontWeight: 'bold',
  fontSize: 16,
  lineHeight: '24px',
  fontStyle: 'normal',
  cursor: 'pointer'
}));

export const CalendarButtonContainer = styled('div')({
  display: 'inline-flex',
  width: '50%',
  justifyContent: 'center'
});

export const LineSeparator = styled('div')(({ theme }) => ({
  width: 1,
  height: 16,
  backgroundColor: theme.dividerColor,
  alignSelf: 'center'
}));

export const Container = styled('div')({
  position: 'relative',
  display: 'inline-flex',
  width: '100%'
});

export const DateButton = styled(FillButton)(({ theme }) => ({
  minWidth: 221,
  color: theme.primaryTextColor,
  padding: 0,
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 16,
  height: 21,
  lineHeight: '21px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  backgroundColor: theme.iconBtnInvertedBgColor,
  '&:hover': {
    backgroundColor: theme.iconBtnInvertedBgColor,
    color: theme.primaryTextColor
  }
}));
