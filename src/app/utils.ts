import { Problem, Question } from "@/types";

async function fetchProblem(title: string) {
    try {
        const problem = await fetch(`/api/fetchproblem?title=${title}`);
        const data = await problem.json();
        return data;
    } catch (e) {
        console.error("Error:", e);
    }
}

async function fetchReadme(html: string) {
    try {
        const response = await fetch("/api/getreadme", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ html }),
        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Error:", e);
    }
}

/*
{
    "question": {
      "questionId": "1",
      "questionFrontendId": "1",
      "title": "Two Sum",
      "titleSlug": "two-sum",
      "content": "<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n\n<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>\n\n<p>You can return the answer in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>Only one valid answer exists.</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face=\"monospace\">&nbsp;</font>time complexity?",
      "difficulty": "Easy",
      "likes": 59461,
      "dislikes": 2127,
      "topicTags": [
        {
          "name": "Array",
          "slug": "array",
          "translatedName": null
        },
        {
          "name": "Hash Table",
          "slug": "hash-table",
          "translatedName": null
        }
      ],
      "stats": "{\"totalAccepted\": \"15.6M\", \"totalSubmission\": \"28.6M\", \"totalAcceptedRaw\": 15608265, \"totalSubmissionRaw\": 28637628, \"acRate\": \"54.5%\"}",
      "hints": [
        "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.",
        "So, if we fix one of the numbers, say <code>x</code>, we have to scan the entire array to find the next number <code>y</code> which is <code>value - x</code> where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
        "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
      ],
      "solution": {
        "id": "7",
        "canSeeDetail": true,
        "paidOnly": false,
        "hasVideoSolution": true,
        "paidOnlyVideo": false
      },
      "status": null,
      "metaData": "{\n  \"name\": \"twoSum\",\n  \"params\": [\n    {\n      \"name\": \"nums\",\n      \"type\": \"integer[]\"\n    },\n    {\n      \"name\": \"target\",\n      \"type\": \"integer\"\n    }\n  ],\n  \"return\": {\n    \"type\": \"integer[]\",\n    \"size\": 2\n  },\n  \"manual\": false\n}",
      "note": null
    }
  }
  */

function formatData(data: Question) {
    const {
        questionFrontendId,
        questionId,
        title,
        titleSlug,
        content,
        difficulty,
        likes,
        dislikes,
        topicTags,
        hints,
        solution,
    } = data;

    const formattedData: Problem = {
        questionFrontendId,
        questionId,
        questionTitle: title,
        titleSlug,
        link: `https://leetcode.com/problems/${titleSlug}`,
        question: content,
        difficulty,
        likes,
        dislikes,
        topicTags,
        hints,
        solution,
    }

    return formattedData;
}
export { fetchProblem, fetchReadme, formatData };