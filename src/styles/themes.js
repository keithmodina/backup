import { rgba, darken } from 'polished';

import loadingGif from '../assets/images/gif/white_transparent.gif';

const PRIMARY_COLOR = '#0074D4';
const SECONDARY_COLOR = rgba('#4297FF', 0.6);

const BLACK = '#000000';
const WHITE = '#FFFFFF';
const TRANSPARENT = 'transparent';

const HEADER_TEXT_COLOR = '#888888';

const PRIMARY_TEXT_COLOR = '#252525';
const SECONDARY_TEXT_COLOR = '#909090';

// BODY
const BODY_COLOR = '#F2F2F2';

// HEADER
const HEADER_BG_COLOR = '#FAFAFA';

// SIDEBAR
const SIDEBAR_TEXT_COLOR = '#FAFAFA';
const SIDEBAR_ICON_COLOR = '#FAFAFA';

const SIDEBAR_ITEM_BORDER_BOTTOM_COLOR = '#1A8EEE';

// FOOTER
const FOOTER_BG_COLOR = '#F2F2F2';
const FOOTER_TEXT_COLOR = '#858585';

// BUTTON
const BUTTON_PRIMARY_BG_COLOR = '#0074D4';
const BUTTON_INVERTED_TEXT_COLOR = '#0074D4';

const BUTTON_SECONDARY_BG_COLOR = '#2d9cdb';

const BUTTON_DISABLED_BG_COLOR = rgba(45, 156, 219, 0.5);
const BUTTON_DISABLED_TEXT_COLOR = rgba(255, 255, 255, 0.6);

const BUTTON_ICON_PRIMARY_BG_COLOR = '#45d690';
const BUTTON_ICON_SECONDARY_BG_COLOR = '#eb5757';

const BUTTON_ICON_PRIMARY_DISABLED_BG_COLOR = rgba(69, 214, 144, 0.6);
const BUTTON_ICON_SECONDARY_DISABLED_BG_COLOR = '#ffdbdb';

const BUTTON_ICON_PRIMARY_DISABLED_TEXT_COLOR = rgba(255, 255, 255, 0.7);
const BUTTON_ICON_SECONDARY_DISABLED_TEXT_COLOR = rgba(235, 87, 87, 0.5);

// INPUT with floating LABEL
const ACTIVE = '#4297FF';
const ERROR = '#FF0000';

const INPUT_BORDER_COLOR = '#E1E1E1';
const INPUT_BORDER_COLOR_ACTIVE = ACTIVE;
const INPUT_BORDER_COLOR_ERROR = ERROR;

const INPUT_BG_COLOR = WHITE;
const INPUT_BG_COLOR_DISABLED = rgba(INPUT_BORDER_COLOR, 0.4);

const INPUT_TEXT_COLOR = '#020912';
const INPUT_LABEL_COLOR = '#252525';
const INPUT_LABEL_COLOR_ACTIVE = ACTIVE;
const INPUT_LABEL_COLOR_INACTIVE = '#858585';
const INPUT_LABEL_COLOR_ERROR = ERROR;

// INPUT
const INPUT_PLACEHOLDER_COLOR = '#252525';

// CARD
const CARD_BORDER_COLOR = '#cccccc';
const CARD_BORDER_GPP_COLOR = '#D6D6D6';
const CARD_CONTENT_TEXT_COLOR = '#222222';
const CARD_TITLE_TEXT_COLOR = PRIMARY_TEXT_COLOR;

// MODAL
const MODAL_BORDER_COLOR = '#EEEEEE';
const MODAL_OVERLAY_COLOR = rgba(BLACK, 0.2);

// CHECKBOX
const CHECKBOX_BORDER_COLOR = '#CCCCCC';
const CHECKBOX_HOVER_COLOR = '#EEEEEE';
const CHECKBOX_CHECKED_BG_COLOR = '#2d9cdb';

// ERROR
const ERROR_TEXT_COLOR = ERROR;

// TABLE
const TABLE_BORDER_COLOR = '#E5E5E5';

// PRIVACY POLICY
const DETAILS_DIVIDER_COLOR = INPUT_BORDER_COLOR;
const DETAILS_BORDER_COLOR = '#D6D6D6';

// TOAST
const TOAST_BACKGROUND_COLOR = rgba(BLACK, 0.7);
const TOAST_BUTTON_COLOR = '#4297ff';
const TOAST_BUTTON_HOVER_COLOR = darken(0.1, TOAST_BUTTON_COLOR);
const TOAST_BUTTON_ACTIVE_COLOR = darken(0.2, TOAST_BUTTON_COLOR);

// Date Picker
const DATEPICKER_CONTAINER_BORDER_COLOR = '#cccccc';
const DATEPICKER_CONTAINER_BG_COLOR = WHITE;
const DATEPICKER_DAY_TEXT_COLOR = '#222222';
const DATEPICKER_DAY_SELECTED_TEXT_COLOR = WHITE;
const DATEPICKER_DAY_HOVER_BG_COLOR = '#ededed';
const DATEPICKER_DAY_SELECTED_BG_COLOR = '#4297ff';
const DATEPICKER_MONTH_WEEK_TEXT_COLOR = '#222222';
const DATEPICKER_OUTSIDE_MONTH_TEXT_COLOR = '#cccccc';
const DATEPICKER_WEEKEEND_COLOR = '#f2470b';
const DATEPICKER_MONTH_YEAR = '#0072DE';

//  OPTIONS
const OPTIONS_BUTTON_ERROR = ERROR;

const LOADING_GIF = loadingGif;

const themes = {
  default: {
    primaryColor: PRIMARY_COLOR,
    black: BLACK,
    white: WHITE,
    headerTextColor: HEADER_TEXT_COLOR,
    fillBtnTextColor: WHITE,
    fillBtnBgColor: BUTTON_PRIMARY_BG_COLOR,
    fillBtnInvertedTextColor: BUTTON_INVERTED_TEXT_COLOR,
    fillBtnBgInvertedColor: WHITE,
    fillBtnDisabledBgColor: BUTTON_DISABLED_BG_COLOR,
    fillBtnDisabledTextColor: BUTTON_DISABLED_TEXT_COLOR,
    fillBtnHoverBgColor: BUTTON_SECONDARY_BG_COLOR,
    iconBtnInvertedBgColor: TRANSPARENT,
    iconBtnTextColor: WHITE,
    iconBtnPrimaryBgColor: BUTTON_ICON_PRIMARY_BG_COLOR,
    iconBtnSecondaryBgColor: BUTTON_ICON_SECONDARY_BG_COLOR,
    iconBtnPrimaryInvertedTextColor: BUTTON_ICON_PRIMARY_BG_COLOR,
    iconBtnSecondaryInvertedTextColor: BUTTON_ICON_SECONDARY_BG_COLOR,
    iconBtnPrimaryDisabledBgColor: BUTTON_ICON_PRIMARY_DISABLED_BG_COLOR,
    iconBtnSecondaryDisabledBgColor: BUTTON_ICON_SECONDARY_DISABLED_BG_COLOR,
    iconBtnPrimaryDisabledTextColor: BUTTON_ICON_PRIMARY_DISABLED_TEXT_COLOR,
    iconBtnSecondaryDisabledTextColor: BUTTON_ICON_SECONDARY_DISABLED_TEXT_COLOR,
    inputBorderColor: INPUT_BORDER_COLOR,
    inputPlaceholderColor: INPUT_PLACEHOLDER_COLOR,
    inputTextColor: INPUT_TEXT_COLOR,
    cardBorderColor: CARD_BORDER_COLOR,
    cardBorderGppColor: CARD_BORDER_GPP_COLOR,
    cardContentTextColor: CARD_CONTENT_TEXT_COLOR,
    cardTitleTextColor: CARD_TITLE_TEXT_COLOR,
    checkboxBorderColor: CHECKBOX_BORDER_COLOR,
    checkboxHoverColor: CHECKBOX_HOVER_COLOR,
    checkboxCheckedBgColor: CHECKBOX_CHECKED_BG_COLOR,
    errorTextColor: ERROR_TEXT_COLOR,
    footerBgColor: FOOTER_BG_COLOR,
    footerTextColor: FOOTER_TEXT_COLOR,
    clickableTextColor: PRIMARY_COLOR,
    bodyColor: BODY_COLOR,
    headerBgColor: HEADER_BG_COLOR,
    modalBorderColor: WHITE,
    modalBgColor: WHITE,
    modalOverlayColor: MODAL_OVERLAY_COLOR,
    primaryTextColor: PRIMARY_TEXT_COLOR,
    secondaryTextColor: SECONDARY_TEXT_COLOR,
    sidebarBgColor: PRIMARY_COLOR,
    sidebarBtnActiveBg: SECONDARY_COLOR,
    sidebarTextColor: SIDEBAR_TEXT_COLOR,
    sidebarIconColor: SIDEBAR_ICON_COLOR,
    datepickerContainerBorderColor: DATEPICKER_CONTAINER_BORDER_COLOR,
    datepickerContainerBgColor: DATEPICKER_CONTAINER_BG_COLOR,
    datepickerDayTextColor: DATEPICKER_DAY_TEXT_COLOR,
    datepickerDaySelectedTextColor: DATEPICKER_DAY_SELECTED_TEXT_COLOR,
    datepickerDayHoverBgColor: DATEPICKER_DAY_HOVER_BG_COLOR,
    datepickerDaySelectedBgColor: DATEPICKER_DAY_SELECTED_BG_COLOR,
    datepickerMonthWeekTextColor: DATEPICKER_MONTH_WEEK_TEXT_COLOR,
    datepickerOutsideMonthColor: DATEPICKER_OUTSIDE_MONTH_TEXT_COLOR,
    datepickerWeekendColor: DATEPICKER_WEEKEEND_COLOR,
    sidebarBtnBorderBottomColor: SIDEBAR_ITEM_BORDER_BOTTOM_COLOR,
    inputBorderColorActive: INPUT_BORDER_COLOR_ACTIVE,
    inputBorderColorError: INPUT_BORDER_COLOR_ERROR,
    inputBgColor: INPUT_BG_COLOR,
    inputBgColorDisabled: INPUT_BG_COLOR_DISABLED,
    inputLabelTextColor: INPUT_LABEL_COLOR,
    inputLabelTextColorActive: INPUT_LABEL_COLOR_ACTIVE,
    inputLabelTextColorInactive: INPUT_LABEL_COLOR_INACTIVE,
    inputLabelTextColorError: INPUT_LABEL_COLOR_ERROR,
    tableBorderColor: TABLE_BORDER_COLOR,
    detailsDividerColor: DETAILS_DIVIDER_COLOR,
    detailsBorderColor: DETAILS_BORDER_COLOR,
    linkTextColor: PRIMARY_COLOR,
    toastBgColor: TOAST_BACKGROUND_COLOR,
    toastButtonActiveColor: TOAST_BUTTON_ACTIVE_COLOR,
    toastButtonColor: TOAST_BUTTON_COLOR,
    toastButtonHoverColor: TOAST_BUTTON_HOVER_COLOR,
    toastColor: WHITE,
    flatBtnTextColor: PRIMARY_COLOR,
    flatBtnBgColor: WHITE,
    loadingIcon: LOADING_GIF,
    datePickerMonthYear: DATEPICKER_MONTH_YEAR,
    optionsButtonError: OPTIONS_BUTTON_ERROR,
    userDetailLabelColor: FOOTER_TEXT_COLOR
  }
};

export default themes;
