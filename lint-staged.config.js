module.exports = {
  "*.{js,jsx,ts,tsx}": filenames => {
    // Escape filenames and join by space
    const joinedFilenames = filenames.map(str => `"${str}"`).join(" ");
    return [
      "run-s check:!(format)",
      `npm run check:format -- ${joinedFilenames}`,
      `npm run _lint -- ${joinedFilenames}`
    ];
    // `run-s check:!(format) "check:format -- ${joinedFilenames}" "_lint -- ${joinedFilenames}"`;
  }
};
