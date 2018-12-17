/*
* Contains functions to parse raw text and convert them into
* scheduled jobs.
*/

const parseRawText = raw => {
  const groupedJobs = raw.split(/\r?\n\n/);

  function parseChunks() {
    let chunks = [];

    groupedJobs.forEach(group => {
      let chunk = group.split(/\r?\n/);
      chunks.push(chunk);
    });

    return chunks;
  }

  return parseChunks();
};

export const createJobObjs = (text, username, firstName, lastName) => {
  let jobs = [];
  let errors = [];

  const ERROR_TYPES = {
    rawTextEmpty: 'This field cannot be empty.',
    slugNotValid: 'URI slugs may only contain lower case letters, numbers, dashes, and underscores.',
    notEnoughFields: 'Each unit must consist of at least three entries, broken by a new line: URI slug, title of the job, the speaker(s), and an optional \"public\" or \"private.\"'
  };

  if (!text) {
    errors.push(ERROR_TYPES.rawTextEmpty);
    return { jobs: '', errors };
  }

  function convertToObjs() {
    parseRawText(text).forEach(jobConst => {
      const slugCheck = new RegExp('^[a-z0-9_-]*$');

      if (jobConst.length < 3) {
        errors.push(`Problem with "${ jobConst }." ${ ERROR_TYPES.notEnoughFields }`);
        return {
          jobs: '',
          errors
        };
      }

      if (!slugCheck.test(jobConst[0].trim())) {
        errors.push(`Problem with "${ jobConst[0] }." ${ ERROR_TYPES.slugNotValid }`);
        return {
          jobs: '',
          errors
        };
      }

      let job = {
        slug: jobConst[0].trim().toLowerCase(),
        title: jobConst[1].trim(),
        speaker: jobConst[2].trim(),
        privacy: jobConst[3] === 'private',
        username,
        fullName: `${ firstName } ${ lastName }`,
        timeCreated: new Date().toUTCString(),
        viewCount: 0,
        completed: false,
        hasStarted: false
      };

      jobs.push(job);

    });
  }

  convertToObjs();
  return { jobs, errors };
};
