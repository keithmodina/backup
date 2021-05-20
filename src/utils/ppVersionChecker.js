export const ppVersionChecker = (isLatest, isOnlyVersion) => {
  let content = 'Are you sure you want to delete this version?';
  if (isOnlyVersion) {
    content = 'Are you sure you want to delete the only version? Doing so will change the location/language status to inactive and will remove it from the client site.';
  } else if (isLatest) {
    content = 'Are you sure you want to delete the latest version? Doing so will mark the next version as the latest.';
  }

  return content;
};
