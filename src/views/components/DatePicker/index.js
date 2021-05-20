import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compareAsc, format } from 'date-fns';
import styled from '@emotion/styled';
import * as Styled from './styles';
import calendar, {
  isDate,
  isSameDay,
  isSameMonth,
  getDateISO,
  getNextMonth,
  getPreviousMonth,
  WEEK_DAYS,
  CALENDAR_MONTHS
} from './helpers';
import SvgIcon from '../SvgIcon';
import ArrorIcon from '../../../assets/icons/common/ic-arrow-left.svg';
import CalendarIcon from '../../../assets/icons/common/datepicker.svg';

const Arrow = styled(SvgIcon)({
  height: 11.87,
  display: 'flex',
  margin: '0 13.5px',
  cursor: 'pointer'
});

const ArrowLeft = styled(Arrow)({
  transform: 'rotate(0deg)'
});

const ArrowRight = styled(Arrow)({
  transform: 'rotate(180deg)'
});

const CalendarIcn = styled(SvgIcon)(({ theme, hasVersion }) => ({
  width: 16.34,
  height: 18.16,
  display: 'flex',
  color: theme.primaryTextColor,
  position: 'absolute',
  right: 0,
  top: hasVersion && -10
}));

const DateText = styled('span')({
  display: 'flex',
  flex: '1 1 auto'
});

class Calendar extends Component {
  state = {
    ...this.resolveStateFromProp(),
    today: new Date(),
    isDatePickOpen: false
  };

  componentDidMount() {
    const now = new Date();
    const tomorrow = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000;
    const ms = tomorrow - now;

    this.dayTimeout = setTimeout(() => {
      this.setState({ today: new Date() }, this.clearDayTimeout);
    }, ms);
  }

  componentDidUpdate(prevProps) {
    const { date, selectedDay, onDateChanged } = this.props;
    const { date: prevDate, selectedDay: prevSelected } = prevProps;
    const dateMatch = date === prevDate || isSameDay(date, prevDate);
    const selectedMatch = selectedDay === prevSelected || isSameDay(selectedDay, prevSelected);

    if (!dateMatch || !selectedMatch) {
      this.setStateWhenDateChangedIsFunc(onDateChanged);
    }
  }

  componentWillUnmount() {
    this.clearPressureTimer();
    this.clearDayTimeout();
  }

  setStateWhenDateChangedIsFunc(onDateChanged) {
    const { date } = this.props;
    this.setState(this.resolveStateFromDate(), () => {
      return typeof onDateChanged === 'function' && onDateChanged(date);
    });
  }

  resolveStateFromProp() {
    const { date } = this.props;
    return this.resolveStateFromDate(date);
  }

  resolveStateFromDate() {
    const { date, selectedDay } = this.props;
    const isDateObject = isDate(date);
    const _date = isDateObject ? date : new Date();

    return {
      current: isDateObject ? date : null,
      month: +_date.getMonth() + 1,
      year: _date.getFullYear(),
      selected: selectedDay && new Date(selectedDay)
    };
  }

  handleDatePickerOpen() {
    const { isDatePickOpen } = this.state;
    this.setState({ isDatePickOpen: !isDatePickOpen });
  }

  getCalendarDates = () => {
    const { current, month, year } = this.state;
    const calendarMonth = month || +current.getMonth() + 1;
    const calendarYear = year || current.getFullYear();

    return calendar(calendarMonth, calendarYear);
  };

  gotoDate = date => evt => {
    evt.preventDefault();
    const { current } = this.state;
    const { onDateChanged } = this.props;

    return !(current
      && isSameDay(date, current))
      && this.setState(this.resolveStateFromDate(date), () => {
        return typeof onDateChanged === 'function' && onDateChanged(date);
      });
  };

  gotoPreviousMonth = () => {
    const { month, year } = this.state;
    this.setState(getPreviousMonth(month, year));
  };

  gotoNextMonth = () => {
    const { month, year } = this.state;
    this.setState(getNextMonth(month, year));
  };

  gotoPreviousYear = () => {
    const { year } = this.state;
    this.setState({ year: year - 1 });
  };

  gotoNextYear = () => {
    const { year } = this.state;
    this.setState({ year: year + 1 });
  };

  handlePressure = fn => {
    if (typeof fn === 'function') {
      fn();
      this.pressureTimeout = setTimeout(() => {
        this.pressureTimer = setInterval(fn, 100);
      }, 500);
    }
  };

  clearPressureTimer = () => {
    if (this.pressureTimer) clearInterval(this.pressureTimer);
    if (this.pressureTimeout) clearTimeout(this.pressureTimeout);
  };

  clearDayTimeout = () => {
    if (this.dayTimeout) return clearTimeout(this.dayTimeout);
  };

  handlePrevious = evt => {
    evt.preventDefault();
    const fn = evt.shiftKey ? this.gotoPreviousYear : this.gotoPreviousMonth;
    this.handlePressure(fn);
  };

  handleNext = evt => {
    evt.preventDefault();
    const fn = evt.shiftKey ? this.gotoNextYear : this.gotoNextMonth;
    this.handlePressure(fn);
  };

  renderCalendarButton = () => {
    const { month, year, current } = this.state;
    const monthname = Object.keys(CALENDAR_MONTHS)[
      Math.max(0, Math.min(month - 1, 11))
    ];
    const { date, buttonStyle, dateFormat } = this.props;
    const _date = new Date(date);

    let dateText = `${monthname} ${_date.getDate()}, ${year}`;

    if (typeof date !== 'string' && dateFormat) {
      dateText = format(new Date(date), 'yyyy-MM-dd');
    }

    return (
      <Styled.DateButton
        inverted
        onClick={() => this.handleDatePickerOpen()}
        style={buttonStyle}
      >
        {date && (
          typeof date === 'string'
            ? <DateText>{date}</DateText>
            : <DateText>{dateText}</DateText>
        )}
        <CalendarIcn
          symbol={CalendarIcon}
          hasVersion={!!date}
        />
      </Styled.DateButton>
    );
  };

  renderMonthAndYear = () => {
    const { month, year } = this.state;
    const monthname = Object.keys(CALENDAR_MONTHS)[
      Math.max(0, Math.min(month - 1, 11))
    ];

    return (
      <Styled.CalendarHeader>
        <ArrowLeft
          symbol={ArrorIcon}
          onMouseDown={this.handlePrevious}
          onMouseUp={this.clearPressureTimer}
          onMouseLeave={this.clearPressureTimer}
          title='Previous Month'
        />
        <Styled.MonthLabel>
          {`${monthname} ${year}`}
        </Styled.MonthLabel>
        <ArrowRight
          symbol={ArrorIcon}
          onMouseDown={this.handleNext}
          onMouseUp={this.clearPressureTimer}
          onMouseLeave={this.clearPressureTimer}
          title='Next Month'
        />
      </Styled.CalendarHeader>
    );
  };

  renderDayLabel = (day, index) => {
    const daylabel = WEEK_DAYS[day];
    return (
      <Styled.DateLabel key={daylabel}>
        <Styled.WeekDayLabel
          key={daylabel}
          index={index}
          inMonth
          isSunday={daylabel === WEEK_DAYS['Sunday']}
        >
          {daylabel}
        </Styled.WeekDayLabel>
      </Styled.DateLabel>
    );
  };

  renderCalendarDate = (date, index) => {
    const {
      current,
      month,
      year,
      today,
      selected
    } = this.state;

    const _date = new Date(date.join('-'));
    const isToday = isSameDay(_date, today);
    const isSelected = selected && isSameDay(_date, selected);
    const isCurrent = current && isSameDay(_date, current);
    const inMonth = month && year && isSameMonth(_date, new Date([year, month, 1].join('-')));

    const isSunday = _date.toDateString().substring(0, 3) === 'Sun';
    const onClick = this.gotoDate(_date);

    const props = {
      index,
      inMonth,
      onClick,
      isSunday,
      title: _date.toDateString()
    };

    const DayContainer = isToday
      ? Styled.TodayLabel
      : isCurrent || isSelected
        ? Styled.HighlightedDate
        : Styled.WeekDayLabel;
    return (
      <Styled.DateLabel key={getDateISO(_date)}>
        <DayContainer {...props}>
          {_date.getDate()}
        </DayContainer>
      </Styled.DateLabel>
    );
  };

  renderFooter = () => {
    const { date, onClickOk, onClickCancel } = this.props;

    return (
      <Styled.CalendarFooter>
        <Styled.CalendarButtonContainer>
          <Styled.LinkButton onClick={() => {
            this.handleDatePickerOpen();
            this.setState({ current: date });
            onClickCancel();
          }}
          >
            Cancel
          </Styled.LinkButton>
        </Styled.CalendarButtonContainer>
        <Styled.LineSeparator />
        <Styled.CalendarButtonContainer>
          <Styled.LinkButton
            onClick={() => {
              const { current } = this.state;
              this.handleDatePickerOpen();
              if (onClickOk) return onClickOk(current);
            }}
          >
            OK
          </Styled.LinkButton>
        </Styled.CalendarButtonContainer>
      </Styled.CalendarFooter>
    );
  };

  render() {
    const { isDatePickOpen } = this.state;
    return (
      <Styled.Container>
        {this.renderCalendarButton()}
        {
        isDatePickOpen
        && (
          <Styled.CalendarContainer>
            {this.renderMonthAndYear()}
            <Fragment>{Object.keys(WEEK_DAYS).map(this.renderDayLabel)}</Fragment>
            <Fragment>
              {this.getCalendarDates().map(this.renderCalendarDate)}
            </Fragment>
            {this.renderFooter()}
          </Styled.CalendarContainer>
        )
        }
      </Styled.Container>
    );
  }
}
Calendar.defaultProps = {
  onDateChanged: PropTypes.func,
  onClickOk: PropTypes.func,
  onClickCancel: PropTypes.func
};

// const defaultProps = {
//   onDateChanged: PropTypes.func,
//   onClickOk: PropTypes.func
// };

export default Calendar;
