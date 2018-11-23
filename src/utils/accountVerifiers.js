export const verifyGithubAccount = async (github, githubVerificationLink, accountAddress) => {
  // Make sure gist link belongs to the github link
  if (!github) {
    return "No Github account provided";
  }
  let verifiedLink = github.replace("https://github.com/", "https://gist.githubusercontent.com/") + "/";
  if (!githubVerificationLink) {
    return "No Github verification link provided";
  }
  if (githubVerificationLink.startsWith(verifiedLink)) {
    let gistFileContent = await (await fetch(githubVerificationLink)).text();

    if (gistFileContent.trim() === accountAddress) {
      return true;
    } else {
      return "The Gist file you submitted doesn't contain your address";
    }
  } else {
    return "The Gist file you submitted does't belong to the Github account you added on your profile";
  }
};
