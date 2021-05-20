export const getUserStatus = status => {
  switch (status) {
    case 'D':
    case 'P':
      return 'Inactive';
    case 'A':
      return 'Active';
    default:
      break;
  }
};
