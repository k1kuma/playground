/*

## Problem Statement

You are given:

- A list of **alumni profiles**. Each alumni profile includes the alumni’s unique `alumni_id`, a set of skills (strings), and optionally their location (city).
- A list of **job postings**. Each posting has a unique `job_id`, a set of required skills (strings), and a target location (city).

**Implement a matcher** that supports the following operations:

1. `add_alumni(alumni_id: int, skills: List[str], location: Optional[str])`
2. `add_job(job_id: int, required_skills: List[str], location: str)`
3. `find_matches(job_id: int, k: int) -> List[int]`
For a given job, return the `alumni_id`s of up to `k` alumni who best match the job.*A "best" match is defined by:*
    - Highest number of matching required skills
    - Alumni location matches job location **if possible** (if there are enough alumni in that location to fill `k` matches)
    If multiple alumni have the same score, break ties by `alumni_id` (smallest first).

### Example

```python
matcher.add_alumni(1, ["python", "aws"], "Toronto")
matcher.add_alumni(2, ["python", "docker"], "Toronto")
matcher.add_alumni(3, ["java", "aws"], "Vancouver")
matcher.add_job(100, ["python", "aws"], "Toronto")
print(matcher.find_matches(100, 2))  # Output: [1, 2]  (both in Toronto, both have at least one skill; id 1 is a perfect match)

*/

class Matcher {
  constructor() {
    this.alumni = new Map(); // alumni_id -> {skills: Set, location: string}
    this.jobs = new Map(); // job_id -> {required_skills: Set, location: string}
  }

  add_alumni(alumni_id, skills, location = null) {
    this.alumni.set(alumni_id, { skills: new Set(skills), location: location ?? null });
  }

  add_job(job_id, skills, location) {
    this.jobs.set(job_id, { required_skills: new Set(skills), location });
  }

  /*
    PSEUDOCODE:
    1. Retrieve the job details using job_id.
    2. For each alumni, calculate the number of matching skills with the job's required skills.
    3. Filter alumni based on location if there are enough matches in the same location as the job.
    4. Sort the alumni by:
       a. Number of matching skills (descending)
       b. Alumni ID (ascending)
    5. Return the top k alumni IDs from the sorted list.

    DISCUSSED PSEUDOCODE:
      - find job_id in this.jobs and obtain the skills & location
      - find alumni with matching or null location
      - for each alumni in this.alumni:
        - for each skill in job.skill
        - look to see if alumni has that skill
        - compute total score
      - pass in alumni total score into returnHeap (size k)
      - flatten the returnHeap into an array
  */
  find_matches(job_id, k) {
    const job = this.jobs.get(job_id);
    if (!job) return [];
    
    const matches = [];
    for (const [alumni_id, { skills, location }] of this.alumni.entries()) {
      const skill_matches = [...job.required_skills].filter(skill => skills.has(skill)).length;
      matches.push({ alumni_id, skill_matches, location });
    }
    
    // Filter by location if there are enough matches in the same location
    const same_location_matches = matches.filter(m => m.location === job.location);
    const use_same_location = same_location_matches.length >= k;
    const filtered_matches = use_same_location ? same_location_matches : matches;
    
    // Sort by skill matches (desc) and then by alumni_id (asc)
    filtered_matches.sort((a, b) => {
      if (b.skill_matches !== a.skill_matches) {
        return b.skill_matches - a.skill_matches; // Descending by skill matches
      }
      return a.alumni_id - b.alumni_id; // Ascending by alumni_id
    });
    
    return filtered_matches.slice(0, k).map(m => m.alumni_id);
  }
}

/*
TEST CASES:
matcher.add_alumni(1, ["python", "aws"], "Toronto")
matcher.add_alumni(2, ["python", "docker"], "Toronto")
matcher.add_alumni(3, ["java", "aws"], "Vancouver")
matcher.add_job(100, ["python", "aws"], "Toronto")
print(matcher.find_matches(100, 2))  # Output: [1, 2]  (both in Toronto, both have at least one skill; id 1 is a perfect match)
*/

const matcher = new Matcher();
matcher.add_alumni(1, ["python", "aws"], "Toronto");
matcher.add_alumni(2, ["python", "docker"], "Toronto");
matcher.add_alumni(3, ["java", "aws"], "Vancouver");
matcher.add_job(100, ["python", "aws"], "Toronto");

console.log(matcher.alumni);
console.log(matcher.jobs);
console.log(matcher.find_matches(100, 2));  // Output: [1, 2]  (both in Toronto, both have at least one skill; id 1 is a perfect match)

