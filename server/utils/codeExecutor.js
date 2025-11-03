const axios = require('axios');

// Judge0 language IDs
const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
  c: 50
};

// Execute code using Judge0 API
exports.executeCode = async (code, language, input = '', expectedOutput = '') => {
  try {
    if (process.env.ENABLE_CODE_EXECUTION !== 'true') {
      return {
        success: false,
        message: 'Code execution is disabled'
      };
    }

    const languageId = LANGUAGE_IDS[language];
    if (!languageId) {
      return {
        success: false,
        message: 'Unsupported language'
      };
    }

    // Submit code to Judge0
    const submissionResponse = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions`,
      {
        source_code: Buffer.from(code).toString('base64'),
        language_id: languageId,
        stdin: Buffer.from(input).toString('base64'),
        expected_output: expectedOutput ? Buffer.from(expectedOutput).toString('base64') : null
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      }
    );

    const token = submissionResponse.data.token;

    // Poll for result
    let result;
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second

      const resultResponse = await axios.get(
        `${process.env.JUDGE0_API_URL}/submissions/${token}`,
        {
          headers: {
            'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        }
      );

      result = resultResponse.data;

      if (result.status.id > 2) {
        // Execution completed
        break;
      }

      attempts++;
    }

    if (!result || result.status.id <= 2) {
      return {
        success: false,
        message: 'Execution timeout'
      };
    }

    // Parse result
    return {
      success: true,
      status: result.status.description,
      statusId: result.status.id,
      output: result.stdout ? Buffer.from(result.stdout, 'base64').toString() : '',
      error: result.stderr ? Buffer.from(result.stderr, 'base64').toString() : '',
      compileOutput: result.compile_output ? Buffer.from(result.compile_output, 'base64').toString() : '',
      time: result.time,
      memory: result.memory,
      passed: result.status.id === 3 // Accepted
    };
  } catch (error) {
    console.error('Code execution error:', error);
    return {
      success: false,
      message: error.message || 'Code execution failed'
    };
  }
};

// Execute code with test cases
exports.executeWithTestCases = async (code, language, testCases) => {
  const results = [];

  for (const testCase of testCases) {
    const result = await exports.executeCode(
      code,
      language,
      testCase.input,
      testCase.output
    );

    results.push({
      input: testCase.input,
      expectedOutput: testCase.output,
      actualOutput: result.output,
      passed: result.passed,
      status: result.status,
      time: result.time,
      memory: result.memory,
      error: result.error
    });

    // Stop if compilation error
    if (result.statusId === 6) {
      break;
    }
  }

  const allPassed = results.every(r => r.passed);
  const passedCount = results.filter(r => r.passed).length;

  return {
    success: true,
    allPassed,
    passedCount,
    totalCount: testCases.length,
    results
  };
};

module.exports = exports;
